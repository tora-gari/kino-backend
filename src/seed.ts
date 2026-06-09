import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DataSource } from "typeorm";
import { Cinema } from "./cinemas/entities/cinema.entity";
import { City } from "./cities/entities/city.entity";
import { Hall } from "./halls/entities/hall.entity";
import { Seat } from "./seats/entities/seat.entity";
import { Movie } from "./movies/entities/movie.entity";
import { Session } from "./sessions/entities/session.entity";


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('Seed start...');

    const cityRepo = dataSource.getRepository(City);
    const cinemaRepo = dataSource.getRepository(Cinema);
    const hallRepo = dataSource.getRepository(Hall);
    const seatRepo = dataSource.getRepository(Seat);
    const movieRepo = dataSource.getRepository(Movie);
    const sessionRepo = dataSource.getRepository(Session);

    console.log('Old data cleansing...');
    await sessionRepo.createQueryBuilder().delete().execute();
    await movieRepo.createQueryBuilder().delete().execute();
    await seatRepo.createQueryBuilder().delete().execute();
    await hallRepo.createQueryBuilder().delete().execute();
    await cinemaRepo.createQueryBuilder().delete().execute();
    await cityRepo.createQueryBuilder().delete().execute();


    console.log('City creating...');
    const cities = await cityRepo.save([
        { name: 'Астана', slug: 'astana' },
        { name: 'Алматы', slug: 'almaty' },
        { name: 'Павлодар', slug: 'pavlodar' },
    ]);

    console.log('Cinema creating...');
    const cinemas = [
        { name: 'Mega Silk Way', city: cities[0] },
        { name: 'Chaplin Khan Shatyr', city: cities[0] },
        { name: 'Keruen Cinema', city: cities[0] },
        { name: 'Kinopark 11 IMAX Esentai', city: cities[1] },
        { name: 'Chapling Mega Almaty', city: cities[1] },
        { name: 'Kinoforum', city: cities[1] },
        { name: 'Festival Cinema', city: cities[2] },
        { name: 'Ertis Cinema', city: cities[2] },
        { name: 'Shaken Aimanov', city: cities[2] },
    ];

    const savedCinemas = await cinemaRepo.save(cinemas);
    const allHalls: Hall[] = [];

    for (const cinema of savedCinemas) {
        const halls = await hallRepo.save([
            { name: '1 Кинозал', cinema },
            { name: '2 Кинозал', cinema },
        ]);

        allHalls.push(...halls);

        for (const hall of halls) {
            const seats: any[] = [];
            for (let row = 1; row <= 5; row++) {
                for (let num = 1; num <= 10; num++) {
                    seats.push({ row, number: num, hall });
                }
            }
            await seatRepo.save(seats);
        }
    }

    console.log('Movies creating..')
    const movies = await movieRepo.save([
        {
            title: 'Дюна: Часть вторая',
            description: 'Герцог Пол Атрейдес присоединяется к фрименам...',
            releaseDate: new Date('2024-03-01'),
            duration: 166,
        },
        {
            title: 'Кунг-фу Панда 4',
            description: 'По становится духовным наставником Долины Мира...',
            releaseDate: new Date('2024-03-08'),
            duration: 94,
        },
        {
            title: 'Оппенгеймер',
            description: 'История жизни американского физика...',
            releaseDate: new Date('2023-07-21'),
            duration: 180,
        },
    ]);

    console.log('Sessions creating..')
    const sessions: any[] = [];
    const today = new Date();

    for (const hall of allHalls) {
        for (const movie of movies) {
            const startTime = new Date(today);
            startTime.setHours(14 + Math.floor(Math.random() * 8), 0, 0, 0);

            sessions.push({
                startTime,
                price: 1500 + Math.floor(Math.random() * 1500),
                movie,
                cinema: hall.cinema,
                hall,
            });
        }
    }

    await sessionRepo.save(sessions);

    console.log('Database completely seeded!');
    await app.close();
}

bootstrap();