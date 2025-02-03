import prisma from '../../prisma/prismaClient.js';



const newIconUrls = [
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Eden',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Jack',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Jessica',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Andrea',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Destiny',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Robert',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Amaya',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Sadie',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Aiden',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Eliza',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Avery',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Jocelyn',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Wyatt',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Riley',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Valentina',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Caleb',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Nolan',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Leo',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=George',
  'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Sarah',
];


const userIds = [
  1, 2, 4, 3, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];

async function updateIcons() {
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];
    const newIconUrl = newIconUrls[i];

    
    await prisma.user.update({
      where: { id: userId },
      data: { icon: newIconUrl },
    });

    console.log(`Updated icon for user ${userId} to ${newIconUrl}`);
  }

  await prisma.$disconnect(); 
}

updateIcons();

