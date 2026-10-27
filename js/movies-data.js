// Sample movie data with IMDb ratings
const moviesData = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        genres: ["drama"],
        rating: 9.3,
        poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        plot: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
        director: "Frank Darabont",
        cast: [
            { name: "Tim Robbins", character: "Andy Dufresne", photo: "https://m.media-amazon.com/images/M/MV5BMTI1OTYxNzAxOF5BMl5BanBnXkFtZTYwNTE5ODI4._V1_UY317_CR16,0,214,317_AL_.jpg" },
            { name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding", photo: "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        genres: ["crime", "drama"],
        rating: 9.2,
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        director: "Francis Ford Coppola",
        cast: [
            { name: "Marlon Brando", character: "Don Vito Corleone", photo: "https://m.media-amazon.com/images/M/MV5BMTg3MDYyMDE5OF5BMl5BanBnXkFtZTcwNjgyNTEzNA@@._V1_UY317_CR97,0,214,317_AL_.jpg" },
            { name: "Al Pacino", character: "Michael Corleone", photo: "https://m.media-amazon.com/images/M/MV5BMTQzMzg1ODAyNl5BMl5BanBnXkFtZTYwMjAxODQ1._V1_UX214_CR0,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genres: ["action", "crime", "drama"],
        rating: 9.0,
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
        plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        director: "Christopher Nolan",
        cast: [
            { name: "Christian Bale", character: "Bruce Wayne", photo: "https://m.media-amazon.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1_UX214_CR0,0,214,317_AL_.jpg" },
            { name: "Heath Ledger", character: "Joker", photo: "https://m.media-amazon.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1_UX214_CR0,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        genres: ["crime", "drama"],
        rating: 8.9,
        poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        director: "Quentin Tarantino",
        cast: [
            { name: "John Travolta", character: "Vincent Vega", photo: "https://m.media-amazon.com/images/M/MV5BMTUwNjQ0ODkxN15BMl5BanBnXkFtZTcwMDc5NjQwNw@@._V1_UY317_CR11,0,214,317_AL_.jpg" },
            { name: "Samuel L. Jackson", character: "Jules Winnfield", photo: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 5,
        title: "Inception",
        year: 2010,
        genres: ["action", "adventure", "sci-fi"],
        rating: 8.8,
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        director: "Christopher Nolan",
        cast: [
            { name: "Leonardo DiCaprio", character: "Cobb", photo: "https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg" },
            { name: "Joseph Gordon-Levitt", character: "Arthur", photo: "https://m.media-amazon.com/images/M/MV5BMTY3NTk0NDI3Ml5BMl5BanBnXkFtZTgwNDA3NjY0MjE@._V1_UY317_CR14,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 6,
        title: "The Matrix",
        year: 1999,
        genres: ["action", "sci-fi"],
        rating: 8.7,
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        director: "Lana Wachowski, Lilly Wachowski",
        cast: [
            { name: "Keanu Reeves", character: "Neo", photo: "https://m.media-amazon.com/images/M/MV5BNjUxNDcwMTg4Ml5BMl5BanBnXkFtZTcwMjU4NDYyOA@@._V1_UY317_CR15,0,214,317_AL_.jpg" },
            { name: "Laurence Fishburne", character: "Morpheus", photo: "https://m.media-amazon.com/images/M/MV5BMTc0NjczNDc1MV5BMl5BanBnXkFtZTYwMDU0Mjg1._V1_UX214_CR0,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 7,
        title: "Parasite",
        year: 2019,
        genres: ["comedy", "drama", "thriller"],
        rating: 8.5,
        poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
        plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        director: "Bong Joon Ho",
        cast: [
            { name: "Song Kang-ho", character: "Kim Ki-taek", photo: "https://m.media-amazon.com/images/M/MV5BMTc4NjAxMjQwOF5BMl5BanBnXkFtZTgwNDg3MzM1MjE@._V1_UY317_CR17,0,214,317_AL_.jpg" },
            { name: "Lee Sun-kyun", character: "Park Dong-ik", photo: "https://m.media-amazon.com/images/M/MV5BYWQwMmE5ZTAtNTYwZS00MDU3LWJmNzQtMzI5YmUxYzQwMmY4XkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_UY317_CR130,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 8,
        title: "Joker",
        year: 2019,
        genres: ["crime", "drama", "thriller"],
        rating: 8.4,
        poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        plot: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
        director: "Todd Phillips",
        cast: [
            { name: "Joaquin Phoenix", character: "Arthur Fleck", photo: "https://m.media-amazon.com/images/M/MV5BZGMyY2Q4NTEtMWVkZS00NzcwLTkzNmQtYzBlMWZhZGNhMDhkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_UY317_CR7,0,214,317_AL_.jpg" },
            { name: "Robert De Niro", character: "Murray Franklin", photo: "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_UY317_CR13,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 9,
        title: "Avengers: Endgame",
        year: 2019,
        genres: ["action", "adventure", "drama"],
        rating: 8.4,
        poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
        plot: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        director: "Anthony Russo, Joe Russo",
        cast: [
            { name: "Robert Downey Jr.", character: "Tony Stark / Iron Man", photo: "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_UX214_CR0,0,214,317_AL_.jpg" },
            { name: "Chris Evans", character: "Steve Rogers / Captain America", photo: "https://m.media-amazon.com/images/M/MV5BMTU2NTg1OTQzMF5BMl5BanBnXkFtZTcwNjIyMjkyMg@@._V1_UY317_CR6,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 10,
        title: "Interstellar",
        year: 2014,
        genres: ["adventure", "drama", "sci-fi"],
        rating: 8.6,
        poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        director: "Christopher Nolan",
        cast: [
            { name: "Matthew McConaughey", character: "Cooper", photo: "https://m.media-amazon.com/images/M/MV5BMTg0MDc3ODUwOV5BMl5BanBnXkFtZTcwMTk2NjY4Nw@@._V1_UX214_CR0,0,214,317_AL_.jpg" },
            { name: "Anne Hathaway", character: "Brand", photo: "https://m.media-amazon.com/images/M/MV5BNjQ5MTAxMDc5OF5BMl5BanBnXkFtZTcwOTI0OTE4OA@@._V1_UY317_CR1,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 11,
        title: "The Silence of the Lambs",
        year: 1991,
        genres: ["crime", "drama", "thriller"],
        rating: 8.6,
        poster: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
        director: "Jonathan Demme",
        cast: [
            { name: "Jodie Foster", character: "Clarice Starling", photo: "https://m.media-amazon.com/images/M/MV5BMTM3MjgyOTQwNF5BMl5BanBnXkFtZTcwMDczMzEwNA@@._V1_UY317_CR12,0,214,317_AL_.jpg" },
            { name: "Anthony Hopkins", character: "Dr. Hannibal Lecter", photo: "https://m.media-amazon.com/images/M/MV5BMTg5ODk1NTc5NF5BMl5BanBnXkFtZTYwMjAwOTI4._V1_UY317_CR6,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 12,
        title: "Get Out",
        year: 2017,
        genres: ["horror", "mystery", "thriller"],
        rating: 7.8,
        poster: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg",
        plot: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
        director: "Jordan Peele",
        cast: [
            { name: "Daniel Kaluuya", character: "Chris Washington", photo: "https://m.media-amazon.com/images/M/MV5BOTk1MzgzOTg5OV5BMl5BanBnXkFtZTcwNDQ4NjMxOA@@._V1_UY317_CR12,0,214,317_AL_.jpg" },
            { name: "Allison Williams", character: "Rose Armitage", photo: "https://m.media-amazon.com/images/M/MV5BNzUxNjM4ODI1OV5BMl5BanBnXkFtZTgwNTEwNDE2OTE@._V1_UY317_CR10,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 13,
        title: "La La Land",
        year: 2016,
        genres: ["comedy", "drama", "music", "romance"],
        rating: 8.0,
        poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg",
        plot: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
        director: "Damien Chazelle",
        cast: [
            { name: "Ryan Gosling", character: "Sebastian", photo: "https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_UY317_CR18,0,214,317_AL_.jpg" },
            { name: "Emma Stone", character: "Mia", photo: "https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_UX214_CR0,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 14,
        title: "The Departed",
        year: 2006,
        genres: ["crime", "drama", "thriller"],
        rating: 8.5,
        poster: "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg",
        plot: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
        director: "Martin Scorsese",
        cast: [
            { name: "Leonardo DiCaprio", character: "Billy Costigan", photo: "https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg" },
            { name: "Matt Damon", character: "Colin Sullivan", photo: "https://m.media-amazon.com/images/M/MV5BMTM0NzYzNDgxMl5BMl5BanBnXkFtZTcwMDg2MTMyMw@@._V1_UY317_CR11,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 15,
        title: "Whiplash",
        year: 2014,
        genres: ["drama", "music"],
        rating: 8.5,
        poster: "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        director: "Damien Chazelle",
        cast: [
            { name: "Miles Teller", character: "Andrew", photo: "https://m.media-amazon.com/images/M/MV5BMTY2MzM2NzAxNF5BMl5BanBnXkFtZTgwMDIyMzg1NDE@._V1_UY317_CR6,0,214,317_AL_.jpg" },
            { name: "J.K. Simmons", character: "Fletcher", photo: "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjQ4OTA4MzE@._V1_UY317_CR2,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 16,
        title: "The Social Network",
        year: 2010,
        genres: ["biography", "drama"],
        rating: 7.8,
        poster: "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        plot: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
        director: "David Fincher",
        cast: [
            { name: "Jesse Eisenberg", character: "Mark Zuckerberg", photo: "https://m.media-amazon.com/images/M/MV5BNTE3MzQzODE3OV5BMl5BanBnXkFtZTcwMDE1NDU5OA@@._V1_UY317_CR6,0,214,317_AL_.jpg" },
            { name: "Andrew Garfield", character: "Eduardo Saverin", photo: "https://m.media-amazon.com/images/M/MV5BMjE2MjI2OTk1OV5BMl5BanBnXkFtZTgwNTY1NzM4MDI@._V1_UX214_CR0,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 17,
        title: "Dune",
        year: 2021,
        genres: ["action", "adventure", "drama", "sci-fi"],
        rating: 8.0,
        poster: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        plot: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        director: "Denis Villeneuve",
        cast: [
            { name: "Timothée Chalamet", character: "Paul Atreides", photo: "https://m.media-amazon.com/images/M/MV5BOWU1Nzg0M2ItYjEzMi00ODliLThkODAtNGEyYzRkZTBmMmEzXkEyXkFqcGdeQXVyNDk2Mzk2NDg@._V1_UY317_CR13,0,214,317_AL_.jpg" },
            { name: "Rebecca Ferguson", character: "Lady Jessica", photo: "https://m.media-amazon.com/images/M/MV5BNzA4NDA1MTA5NV5BMl5BanBnXkFtZTcwNjMyNTQ3OA@@._V1_UY317_CR6,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 18,
        title: "Everything Everywhere All at Once",
        year: 2022,
        genres: ["action", "adventure", "comedy", "sci-fi"],
        rating: 7.9,
        poster: "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
        plot: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
        director: "Daniel Kwan, Daniel Scheinert",
        cast: [
            { name: "Michelle Yeoh", character: "Evelyn Wang", photo: "https://m.media-amazon.com/images/M/MV5BMTg1NTU5ODktZjJiMS00ZGY4LThkNTgtZjgwNTRiMTlmZjQzXkEyXkFqcGdeQXVyMTM1MjAxMDc3._V1_UY317_CR10,0,214,317_AL_.jpg" },
            { name: "Ke Huy Quan", character: "Waymond Wang", photo: "https://m.media-amazon.com/images/M/MV5BZTlkYmI3NzktNjY2My00ZGM0LWEzN2UtNzZkNTk0YWJiYTUxXkEyXkFqcGdeQXVyMTU2OTM5NDQw._V1_UY317_CR131,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 19,
        title: "The Batman",
        year: 2022,
        genres: ["action", "crime", "drama"],
        rating: 7.8,
        poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
        plot: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        director: "Matt Reeves",
        cast: [
            { name: "Robert Pattinson", character: "Bruce Wayne / Batman", photo: "https://m.media-amazon.com/images/M/MV5BNzk0MDQ5OTUxMV5BMl5BanBnXkFtZTcwMDM5ODk5Mg@@._V1_UY317_CR12,0,214,317_AL_.jpg" },
            { name: "Zoë Kravitz", character: "Selina Kyle / Catwoman", photo: "https://m.media-amazon.com/images/M/MV5BM2NmYjZjOGUtYjU0OC00YTY4LWJkMTktYWE4MjZlZDJhOWYzXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_UY317_CR12,0,214,317_AL_.jpg" }
        ]
    },
    {
        id: 20,
        title: "Top Gun: Maverick",
        year: 2022,
        genres: ["action", "drama"],
        rating: 8.3,
        poster: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
        plot: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
        director: "Joseph Kosinski",
        cast: [
            { name: "Tom Cruise", character: "Capt. Pete 'Maverick' Mitchell", photo: "https://m.media-amazon.com/images/M/MV5BYTFlOTdjMjgtNmY0ZC00MDgxLThjNmEtZGIxZTQyZDdkMTRjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UY317_CR57,0,214,317_AL_.jpg" },
            { name: "Miles Teller", character: "Lt. Bradley 'Rooster' Bradshaw", photo: "https://m.media-amazon.com/images/M/MV5BMTY2MzM2NzAxNF5BMl5BanBnXkFtZTgwMDIyMzg1NDE@._V1_UY317_CR6,0,214,317_AL_.jpg" }
        ]
    }
];

// Function to get the latest movies (for updating with time)
function getLatestMovies() {
    const currentYear = new Date().getFullYear();
    return moviesData.filter(movie => movie.year >= currentYear - 2);
}

// Function to get top-rated movies
function getTopRatedMovies() {
    return [...moviesData].sort((a, b) => b.rating - a.rating).slice(0, 10);
}