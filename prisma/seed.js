const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const employees = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'Diana' },
    { name: 'Eve' },
    { name: 'Frank' },
    { name: 'Grace' },
    { name: 'Hank' },
    { name: 'Ivy' },
    { name: 'Jack' },
  ];

  await prisma.employee.createMany({ data: employees });
  console.log('Database seeded with employees.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
