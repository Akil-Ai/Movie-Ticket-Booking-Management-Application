import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clear existing
  await prisma.bookingRequest.deleteMany();
  await prisma.show.deleteMany();
  await prisma.movie.deleteMany();

  // Create Movies
  await prisma.movie.create({
    data: {
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop', // Abstract space
      genre: 'Sci-Fi/Drama',
      durationMinutes: 169,
      showType: 'Premium',
      shows: {
        create: [
          {
            theatre: 'Screen 1 - IMAX',
            location: 'Downtown Cineplex',
            dateTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
            totalSeats: 150,
            seatsAvailable: 150,
            pricePerSeat: 25.0
          }
        ]
      }
    }
  });

  await prisma.movie.create({
    data: {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop', // Dark theme
      genre: 'Action/Crime',
      durationMinutes: 152,
      showType: 'Standard',
      shows: {
        create: [
          {
            theatre: 'Screen 3',
            location: 'Uptown Mall',
            dateTime: new Date(new Date().getTime() + 48 * 60 * 60 * 1000), 
            totalSeats: 100,
            seatsAvailable: 80,
            pricePerSeat: 15.0
          }
        ]
      }
    }
  });

  await prisma.movie.create({
    data: {
      title: 'Dune: Part Two',
      description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
      posterUrl: 'https://images.unsplash.com/photo-1547726590-449e7b2ff929?q=80&w=800&auto=format&fit=crop', // Desert theme
      genre: 'Sci-Fi/Adventure',
      durationMinutes: 166,
      showType: 'Premium',
      shows: {
        create: [
          {
            theatre: 'Screen 2 - Dolby Atmos',
            location: 'Downtown Cineplex',
            dateTime: new Date(new Date().getTime() + 72 * 60 * 60 * 1000), 
            totalSeats: 200,
            seatsAvailable: 200,
            pricePerSeat: 30.0
          }
        ]
      }
    }
  });

  await prisma.movie.create({
    data: {
      title: 'La La Land',
      description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
      posterUrl: 'https://images.unsplash.com/photo-1517331568289-42b71946eb11?q=80&w=800&auto=format&fit=crop', // Romantic/Music theme
      genre: 'Romance/Musical',
      durationMinutes: 128,
      showType: 'Standard',
      shows: {
        create: [
          {
            theatre: 'Screen 4',
            location: 'Westside Theatre',
            dateTime: new Date(new Date().getTime() + 96 * 60 * 60 * 1000), 
            totalSeats: 80,
            seatsAvailable: 80,
            pricePerSeat: 12.0
          }
        ]
      }
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
