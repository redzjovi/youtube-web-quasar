import JikanRepository from 'src/repositories/JikanRepository';
// import TheMovieDatabaseRepository from 'src/repositories/TheMovieDatabaseRepository';

export default () => {
  return new JikanRepository();
  // return new TheMovieDatabaseRepository();
};
