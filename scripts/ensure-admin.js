const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@phulam.com" },
    update: { password: hash, role: "ADMIN" },
    create: {
      email: "admin@phulam.com",
      password: hash,
      role: "ADMIN",
      name: "Phạm Hữu Phước (Admin)",
    },
  });
  console.log("🎉 ĐÃ KHỞI TẠO XONG TÀI KHOẢN ADMIN: admin@phulam.com / admin123");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
