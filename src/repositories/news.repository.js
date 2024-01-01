import newsModel from "../database/models/news..model";
import BaseRepository from "../helpers/BaseRepository";

class NewsRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new NewsRepository({ model: newsModel });
