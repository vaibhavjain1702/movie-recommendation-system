# Movie Recommendation Notebooks

Exploratory data analysis and recommender-system experiments on a movie dataset.

## Notebooks

- `movie_recommend EDA analysis.ipynb` - data inspection, missing values, genre / director / year / certification distributions, and visualisations (seaborn, matplotlib).
- `movie_recommend.ipynb` - the same EDA plus recommenders:
  - **Content-based**: TF-IDF over genres/metadata + cosine similarity.
  - **Collaborative filtering**: item-item cosine similarity over a small simulated user-ratings matrix.
  - A small Streamlit dashboard sketch.

## Dataset

The notebooks read a CSV named **`Movie_Database.csv`** (loaded from `/content/` on Google Colab, with `latin1` / `ISO-8859-1` encoding). That file is **not included**. It is expected to have columns such as `Title`, `Genres` (comma-separated), `Director`, `Writer`, `Year` and `Certification/Rating`. Supply a CSV with that schema and place it next to the notebooks (or adjust the path in the first `read_csv` cell).

`IMDB-Movie-Data.csv` (1,000 IMDB movies, 2006-2016: genre, description, director, actors, year, runtime, rating, votes, revenue, metascore) is included as a related sample dataset. It has a different schema (`Genre` rather than `Genres`, no `Certification/Rating`), so the notebooks need column renames to run on it.

## Run

```bash
pip install pandas numpy scikit-learn matplotlib seaborn jupyter streamlit
jupyter notebook
```

See also the companion project `movie-recommendation-website` (TMDB-powered web app).
