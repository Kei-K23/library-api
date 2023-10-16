import { getDB } from "../src/lib/db";

async function seed() {
  // await Promise.all(
  //   getAllRole().map(async (role) => {
  //     const db = getDB();
  //     try {
  //       await db.role.create({
  //         data: {
  //           role_name: role.role_name,
  //         },
  //       });
  //     } catch (e) {
  //       return console.error("Error creating Role:", e);
  //     } finally {
  //       db.$disconnect();
  //     }
  //   })
  // );
  // await Promise.all(
  //   getAllAuthor().map(async (author) => {
  //     const db = getDB();
  //     try {
  //       await db.author.create({
  //         data: {
  //           name: author.name,
  //           email: author.email,
  //           nation: author.nation,
  //           quote: author.quote,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Error creating Author:", error);
  //     } finally {
  //       await db.$disconnect();
  //     }
  //   })
  // );
  // await Promise.all(
  //   getAllBooks().map(async (book) => {
  //     const db = getDB();
  //     try {
  //       await db.book.create({
  //         data: {
  //           title: book.title,
  //           genre: book.genre,
  //           published_date: book.published_date,
  //           description: book.description,
  //           author_id: book.author_id,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Error creating book:", error);
  //     } finally {
  //       await db.$disconnect();
  //     }
  //   })
  // );
}
//! Need to be run for the first time to populate data
// seed();

function getAllRole(): Array<RoleType> {
  return [
    {
      role_name: "admin",
    },
    {
      role_name: "user",
    },
  ];
}

function getAllAuthor(): Array<AuthorType> {
  return [
    {
      name: "William Shakespeare",
      email: "william@example.com",
      nation: "England",
      quote: "To be or not to be, that is the question.",
    },
    {
      name: "Jane Austen",
      email: "jane@example.com",
      nation: "England",
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    },
    {
      name: "Leo Tolstoy",
      email: "leo@example.com",
      nation: "Russia",
      quote:
        "All happy families are alike; each unhappy family is unhappy in its own way.",
    },
    {
      name: "George Orwell",
      email: "george@example.com",
      nation: "England",
      quote:
        "All animals are equal, but some animals are more equal than others.",
    },
    {
      name: "J.K. Rowling",
      email: "jk@example.com",
      nation: "United Kingdom",
      quote:
        "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.",
    },
    {
      name: "Charles Dickens",
      email: "charles@example.com",
      nation: "England",
      quote: "It was the best of times, it was the worst of times.",
    },
    {
      name: "Mark Twain",
      email: "mark@example.com",
      nation: "United States",
      quote:
        "The two most important days in your life are the day you are born and the day you find out why.",
    },
    {
      name: "Harper Lee",
      email: "harper@example.com",
      nation: "United States",
      quote:
        "You never really understand a person until you consider things from his point of view... Until you climb into his skin and walk around in it.",
    },
    {
      name: "Fyodor Dostoevsky",
      email: "fyodor@example.com",
      nation: "Russia",
      quote: "Man is what he believes.",
    },
    {
      name: "Agatha Christie",
      email: "agatha@example.com",
      nation: "England",
      quote:
        "The impossible could not have happened, therefore the impossible must be possible in spite of appearances.",
    },
  ];
}

function getAllBooks(): Array<BookType> {
  return [
    {
      title: "Hamlet",
      genre: "Tragedy",
      published_date: new Date("1609-12-25"),
      author_id: 1, // William Shakespeare
      description:
        "Hamlet is a tragedy by William Shakespeare that tells the story of a young prince of Denmark who must uncover the truth about his father's death.",
    },
    {
      title: "Romeo and Juliet",
      genre: "Tragedy",
      published_date: new Date("1597-01-22"),
      author_id: 1,
      description:
        "Romeo and Juliet is a tragedy by William Shakespeare that tells the story of two young lovers from feuding families.",
    },
    {
      title: "Macbeth",
      genre: "Tragedy",
      published_date: new Date("1623-01-07"),
      author_id: 1,
      description:
        "Macbeth is a tragedy by William Shakespeare that explores themes of ambition, power, and guilt.",
    },
    {
      title: "Othello",
      genre: "Tragedy",
      published_date: new Date("1622-01-07"),
      author_id: 1,
      description:
        "Othello is a tragedy by William Shakespeare that revolves around themes of jealousy and manipulation.",
    },
    {
      title: "The Tempest",
      genre: "Comedy",
      published_date: new Date("1623-01-01"),
      author_id: 1,
      description:
        "The Tempest is a comedy by William Shakespeare featuring themes of magic and forgiveness.",
    },
    {
      title: "Hamlet",
      genre: "Tragedy",
      published_date: new Date("1603-01-01"),
      author_id: 1,
      description:
        "Hamlet is a tragedy by William Shakespeare that explores themes of revenge and madness.",
    },
    {
      title: "A Midsummer Night's Dream",
      genre: "Comedy",
      published_date: new Date("1600-01-01"),
      author_id: 1,
      description:
        "A Midsummer Night's Dream is a comedy by William Shakespeare involving love and enchantment.",
    },
    {
      title: "King Lear",
      genre: "Tragedy",
      published_date: new Date("1606-01-01"),
      author_id: 1,
      description:
        "King Lear is a tragedy by William Shakespeare that delves into themes of family and betrayal.",
    },
    {
      title: "As You Like It",
      genre: "Comedy",
      published_date: new Date("1623-01-01"),
      author_id: 1,
      description:
        "As You Like It is a comedy by William Shakespeare focusing on themes of love and disguise.",
    },
    {
      title: "Twelfth Night",
      genre: "Comedy",
      published_date: new Date("1623-01-01"),
      author_id: 1,
      description:
        "Twelfth Night is a comedy by William Shakespeare involving mistaken identity and romance.",
    },
    {
      title: "The Merchant of Venice",
      genre: "Comedy",
      published_date: new Date("1600-01-01"),
      author_id: 1,
      description:
        "The Merchant of Venice is a comedy by William Shakespeare with themes of love and justice.",
    },
    {
      title: "Pride and Prejudice",
      genre: "Novel",
      published_date: new Date("1813-01-28"),
      author_id: 2, // Jane Austen
      description:
        "Pride and Prejudice is a novel by Jane Austen that explores themes of love, class, and societal expectations in early 19th-century England.",
    },
    {
      title: "Sense and Sensibility",
      genre: "Novel",
      published_date: new Date("1811-01-01"),
      author_id: 2,
      description:
        "Sense and Sensibility is a novel by Jane Austen exploring the contrast between the Dashwood sisters' personalities.",
    },
    {
      title: "Mansfield Park",
      genre: "Novel",
      published_date: new Date("1814-01-01"),
      author_id: 2,
      description:
        "Mansfield Park is a novel by Jane Austen that follows the life of Fanny Price and her experiences at Mansfield Park.",
    },
    {
      title: "Northanger Abbey",
      genre: "Gothic Novel",
      published_date: new Date("1817-01-01"),
      author_id: 2,
      description:
        "Northanger Abbey is a novel by Jane Austen that parodies gothic fiction and explores the imagination of the protagonist, Catherine Morland.",
    },
    {
      title: "Emma",
      genre: "Novel",
      published_date: new Date("1815-01-01"),
      author_id: 2,
      description:
        "Emma is a novel by Jane Austen that delves into the matchmaking efforts of the eponymous character, Emma Woodhouse.",
    },
    {
      title: "Persuasion",
      genre: "Novel",
      published_date: new Date("1817-01-01"),
      author_id: 2,
      description:
        "Persuasion is a novel by Jane Austen that explores the theme of second chances in love.",
    },
    {
      title: "Lady Susan",
      genre: "Epistolary Novel",
      published_date: new Date("1871-01-01"),
      author_id: 2,
      description:
        "Lady Susan is an epistolary novel by Jane Austen, telling the story through a series of letters.",
    },
    {
      title: "Sanditon",
      genre: "Novel",
      published_date: new Date("1871-01-01"),
      author_id: 2,
      description:
        "Sanditon is an unfinished novel by Jane Austen, depicting the development of a fictional seaside town.",
    },
    {
      title: "Love and Freindship",
      genre: "Epistolary Novel",
      published_date: new Date("1922-01-01"),
      author_id: 2,
      description:
        "Love and Freindship is an epistolary novel by Jane Austen, known for its humor and satire.",
    },
    {
      title: "The Watsons",
      genre: "Novel",
      published_date: new Date("1871-01-01"),
      author_id: 2,
      description:
        "The Watsons is an unfinished novel by Jane Austen, focusing on the life of Emma Watson in her family.",
    },
    {
      title: "Catherine, or The Bower",
      genre: "Novel",
      published_date: new Date("1951-01-01"),
      author_id: 2,
      description:
        "Catherine, or The Bower is an unfinished novel by Jane Austen, depicting the life of Catherine.",
    },
    {
      title: "War and Peace",
      genre: "Historical Fiction",
      published_date: new Date("1869-01-01"),
      author_id: 3, // Leo Tolstoy
      description:
        "War and Peace is a novel by Leo Tolstoy that chronicles the French invasion of Russia and the impact of the Napoleonic era on Russian society.",
    },
    {
      title: "War and Peace",
      genre: "Historical Novel",
      published_date: new Date("1869-01-01"),
      author_id: 3,
      description:
        "War and Peace is a historical novel by Leo Tolstoy depicting the events of the Napoleonic era in Russia.",
    },
    {
      title: "Anna Karenina",
      genre: "Novel",
      published_date: new Date("1878-01-01"),
      author_id: 3,
      description:
        "Anna Karenina is a novel by Leo Tolstoy exploring themes of love, infidelity, and societal norms.",
    },
    {
      title: "Resurrection",
      genre: "Novel",
      published_date: new Date("1899-01-01"),
      author_id: 3,
      description:
        "Resurrection is a novel by Leo Tolstoy focusing on themes of justice, morality, and redemption.",
    },
    {
      title: "The Kreutzer Sonata",
      genre: "Novella",
      published_date: new Date("1889-01-01"),
      author_id: 3,
      description:
        "The Kreutzer Sonata is a novella by Leo Tolstoy exploring themes of jealousy and desire.",
    },
    {
      title: "Childhood",
      genre: "Autobiographical Novel",
      published_date: new Date("1852-01-01"),
      author_id: 3,
      description:
        "Childhood is an autobiographical novel by Leo Tolstoy, the first part of his trilogy.",
    },
    {
      title: "Boyhood",
      genre: "Autobiographical Novel",
      published_date: new Date("1854-01-01"),
      author_id: 3,
      description:
        "Boyhood is an autobiographical novel by Leo Tolstoy, the second part of his trilogy.",
    },
    {
      title: "Youth",
      genre: "Autobiographical Novel",
      published_date: new Date("1857-01-01"),
      author_id: 3,
      description:
        "Youth is an autobiographical novel by Leo Tolstoy, the third part of his trilogy.",
    },
    {
      title: "Family Happiness",
      genre: "Novella",
      published_date: new Date("1859-01-01"),
      author_id: 3,
      description:
        "Family Happiness is a novella by Leo Tolstoy exploring the challenges of family life.",
    },
    {
      title: "The Cossacks",
      genre: "Novella",
      published_date: new Date("1863-01-01"),
      author_id: 3,
      description:
        "The Cossacks is a novella by Leo Tolstoy set in the Caucasus and focusing on themes of conflict and love.",
    },
    {
      title: "The Death of Ivan Ilyich",
      genre: "Novella",
      published_date: new Date("1886-01-01"),
      author_id: 3,
      description:
        "The Death of Ivan Ilyich is a novella by Leo Tolstoy exploring the nature of life and death.",
    },
    {
      title: "1984",
      genre: "Dystopian Fiction",
      published_date: new Date("1949-06-08"),
      author_id: 4, // George Orwell
      description:
        "1984 is a dystopian novel by George Orwell that explores themes of totalitarianism, surveillance, and the consequences of a dystopian society.",
    },
    {
      title: "Harry Potter and the Sorcerer's Stone",
      genre: "Fantasy",
      published_date: new Date("1997-06-26"),
      author_id: 5, // J.K. Rowling
      description:
        "Harry Potter and the Sorcerer's Stone is the first book in the Harry Potter series, introducing readers to the world of magic and Hogwarts School of Witchcraft and Wizardry.",
    },
    // Charles Dickens (Author ID: 6)
    {
      title: "Great Expectations",
      genre: "Novel",
      published_date: new Date("1861-01-01"),
      author_id: 6,
      description:
        "Great Expectations is a novel by Charles Dickens that tells the story of the orphan Pip and his journey to becoming a gentleman.",
    },
    {
      title: "A Tale of Two Cities",
      genre: "Historical Novel",
      published_date: new Date("1859-01-01"),
      author_id: 6,
      description:
        "A Tale of Two Cities is a historical novel by Charles Dickens set during the turbulent times of the French Revolution.",
    },
    {
      title: "Oliver Twist",
      genre: "Novel",
      published_date: new Date("1837-01-01"),
      author_id: 6,
      description:
        "Oliver Twist is a novel by Charles Dickens portraying the life of an orphan named Oliver Twist.",
    },
    {
      title: "David Copperfield",
      genre: "Novel",
      published_date: new Date("1850-01-01"),
      author_id: 6,
      description:
        "David Copperfield is a novel by Charles Dickens, widely considered to be semi-autobiographical.",
    },
    {
      title: "Bleak House",
      genre: "Novel",
      published_date: new Date("1853-01-01"),
      author_id: 6,
      description:
        "Bleak House is a novel by Charles Dickens known for its intricate and complex narrative structure.",
    },
    {
      title: "Hard Times",
      genre: "Novel",
      published_date: new Date("1854-01-01"),
      author_id: 6,
      description:
        "Hard Times is a novel by Charles Dickens addressing social and economic issues in Victorian England.",
    },
    {
      title: "The Pickwick Papers",
      genre: "Novel",
      published_date: new Date("1836-01-01"),
      author_id: 6,
      description:
        "The Pickwick Papers is a humorous novel by Charles Dickens, featuring the adventures of the Pickwick Club.",
    },
    {
      title: "Little Dorrit",
      genre: "Novel",
      published_date: new Date("1855-01-01"),
      author_id: 6,
      description:
        "Little Dorrit is a novel by Charles Dickens exploring themes of debt and imprisonment.",
    },
    {
      title: "Nicholas Nickleby",
      genre: "Novel",
      published_date: new Date("1839-01-01"),
      author_id: 6,
      description:
        "Nicholas Nickleby is a novel by Charles Dickens telling the story of the eponymous character's struggles.",
    },
    {
      title: "Martin Chuzzlewit",
      genre: "Novel",
      published_date: new Date("1844-01-01"),
      author_id: 6,
      description:
        "Martin Chuzzlewit is a novel by Charles Dickens known for its satirical portrayal of American society.",
    },

    {
      title: "The Adventures of Huckleberry Finn",
      genre: "Adventure",
      published_date: new Date("1884-12-10"),
      author_id: 7, // Mark Twain
      description:
        "The Adventures of Huckleberry Finn is a novel by Mark Twain that follows the adventures of a young boy, Huck, and a runaway slave, Jim, along the Mississippi River.",
    },
    {
      title: "To Kill a Mockingbird",
      genre: "Fiction",
      published_date: new Date("1960-07-11"),
      author_id: 8, // Harper Lee
      description:
        "To Kill a Mockingbird is a novel by Harper Lee that addresses issues of racism and injustice in the American South through the eyes of young Scout Finch.",
    },
    {
      title: "Crime and Punishment",
      genre: "Psychological Fiction",
      published_date: new Date("1866-11-14"),
      author_id: 9, // Fyodor Dostoevsky
      description:
        "Crime and Punishment is a novel by Fyodor Dostoevsky that delves into the psychological struggles of a young student, Raskolnikov, who commits a murder and grapples with guilt.",
    },
    {
      title: "Murder on the Orient Express",
      genre: "Mystery",
      published_date: new Date("1934-01-01"),
      author_id: 10, // Agatha Christie
      description:
        "Murder on the Orient Express is a mystery novel by Agatha Christie featuring the detective Hercule Poirot, who investigates a murder on the luxurious Orient Express train.",
    },
    {
      title: "And Then There Were None",
      genre: "Mystery Novel",
      published_date: new Date("1939-01-01"),
      author_id: 10,
      description:
        "And Then There Were None is a mystery novel by Agatha Christie involving ten strangers trapped on an island.",
    },
    {
      title: "The Murder of Roger Ackroyd",
      genre: "Mystery Novel",
      published_date: new Date("1926-01-01"),
      author_id: 10,
      description:
        "The Murder of Roger Ackroyd is a mystery novel by Agatha Christie, known for its innovative narrative technique.",
    },
    {
      title: "Death on the Nile",
      genre: "Mystery Novel",
      published_date: new Date("1937-01-01"),
      author_id: 10,
      description:
        "Death on the Nile is a mystery novel by Agatha Christie featuring the detective Hercule Poirot.",
    },
    {
      title: "The ABC Murders",
      genre: "Mystery Novel",
      published_date: new Date("1936-01-01"),
      author_id: 10,
      description:
        "The ABC Murders is a mystery novel by Agatha Christie in which the victims are alphabetically arranged.",
    },
    {
      title: "Murder in the Cathedral",
      genre: "Play",
      published_date: new Date("1935-01-01"),
      author_id: 10,
      description:
        "Murder in the Cathedral is a verse drama by Agatha Christie depicting the murder of Thomas Becket.",
    },
    {
      title: "A Murder is Announced",
      genre: "Mystery Novel",
      published_date: new Date("1950-01-01"),
      author_id: 10,
      description:
        "A Murder is Announced is a mystery novel by Agatha Christie involving a murder announced in a local newspaper.",
    },
    {
      title: "Peril at End House",
      genre: "Mystery Novel",
      published_date: new Date("1932-01-01"),
      author_id: 10,
      description:
        "Peril at End House is a mystery novel by Agatha Christie featuring the detective Hercule Poirot.",
    },
    {
      title: "The Hollow",
      genre: "Mystery Novel",
      published_date: new Date("1946-01-01"),
      author_id: 10,
      description:
        "The Hollow is a mystery novel by Agatha Christie involving a murder at a country house.",
    },
    {
      title: "Crooked House",
      genre: "Mystery Novel",
      published_date: new Date("1949-01-01"),
      author_id: 10,
      description:
        "Crooked House is a mystery novel by Agatha Christie focusing on a wealthy family with dark secrets.",
    },
  ];
}
