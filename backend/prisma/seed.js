const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: hashedPassword,
    },
  });

  // Create sample tasks for user1
  await prisma.task.createMany({
    data: [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the new project',
        status: 'pending',
        userId: user1.id,
      },
      {
        title: 'Review code changes',
        description: 'Review pull requests from team members',
        status: 'in-progress',
        userId: user1.id,
      },
      {
        title: 'Setup development environment',
        description: 'Configure local development environment for new developers',
        status: 'completed',
        userId: user1.id,
      },
      {
        title: 'Plan sprint meeting',
        description: 'Prepare agenda and schedule sprint planning meeting',
        status: 'pending',
        userId: user1.id,
      },
      {
        title: 'Update dependencies',
        description: 'Update all project dependencies to latest versions',
        status: 'in-progress',
        userId: user1.id,
      },
    ],
  });

  // Create sample tasks for user2
  await prisma.task.createMany({
    data: [
      {
        title: 'Design user interface',
        description: 'Create mockups for the new dashboard',
        status: 'completed',
        userId: user2.id,
      },
      {
        title: 'Test application',
        description: 'Perform comprehensive testing of all features',
        status: 'in-progress',
        userId: user2.id,
      },
      {
        title: 'Deploy to production',
        description: 'Deploy the latest version to production server',
        status: 'pending',
        userId: user2.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
  console.log('Sample users created:');
  console.log('- john@example.com (password: password123)');
  console.log('- jane@example.com (password: password123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });