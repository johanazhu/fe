// 将仓库根目录的 .env 加载到 process.env（项目要求 Node.js >= 24，见 .nvmrc / engines）
// .env 已加入 .gitignore；文件不存在时静默跳过，
// 保证开源环境下没有私密配置也能正常构建（对应统计/验证脚本不会被注入）
try {
    process.loadEnvFile();
} catch {}
