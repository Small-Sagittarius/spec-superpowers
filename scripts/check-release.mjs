#!/usr/bin/env node
// 发布校验：确认所有技能的 frontmatter version 一致，并可选择性校验与 tag 版本匹配。
// 用法：
//   一致性检查：   node scripts/check-release.mjs
//   指定期望版本： node scripts/check-release.mjs --expected=1.1.0
//                 （或设环境变量 EXPECTED_VERSION=1.1.0）
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const skillsDir = join(root, 'skills');

function fail(msg) {
  console.error('❌ ' + msg);
  process.exit(1);
}

if (!existsSync(skillsDir)) {
  fail('未找到 skills/ 目录，请在仓库根目录运行本脚本');
}

const skillDirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

if (skillDirs.length === 0) {
  fail('skills/ 下没有任何技能目录');
}

const versions = {};
for (const name of skillDirs) {
  const file = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(file)) {
    console.warn(`⚠️  ${name} 缺少 SKILL.md，跳过`);
    continue;
  }
  const text = readFileSync(file, 'utf8');
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) fail(`${name}/SKILL.md 没有 frontmatter`);
  const vm = fm[1].match(/^version:\s*"?([^"\r\n]+)"?\s*$/m);
  if (!vm) fail(`${name}/SKILL.md 缺少 version 字段`);
  versions[name] = vm[1].trim();
}

// 1) 一致性检查：所有技能 version 必须相同
const unique = [...new Set(Object.values(versions))];
if (unique.length > 1) {
  const lines = skillDirs
    .filter((n) => versions[n])
    .map((n) => `    ${n}: ${versions[n]}`)
    .join('\n');
  fail(`技能 version 不一致，发版前必须全部对齐：\n${lines}`);
}
const current = unique[0];
console.log(`✅ 全部 ${skillDirs.length} 个技能 version 一致：${current}`);

// 2) 期望版本检查（发版 / 打 tag 时）
const expected =
  process.argv
    .slice(2)
    .find((a) => a.startsWith('--expected='))
    ?.split('=')[1] || process.env.EXPECTED_VERSION;

if (expected) {
  if (expected !== current) {
    fail(`期望版本 ${expected} 与实际版本 ${current} 不符`);
  }
  console.log(`✅ 与期望版本 ${expected} 匹配`);
}

console.log('🎉 发布校验通过');
