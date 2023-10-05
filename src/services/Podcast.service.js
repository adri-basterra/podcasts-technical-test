
const apiHostURL = "https://itunes.apple.com";
const topPodcastsURL = `${apiHostURL}/us/rss/toppodcasts/limit=100/genre=1310/json`
const allowOriginsURL = "https://api.allorigins.win";
const episodesFiltersURL = "country=US&media=podcast&entity=podcastEpisode&limit=100";

const TYPE_PODCAST = "track";
const TYPE_EPISODE = "podcastEpisode";

export const PodcastService = {

  async getAllPodcasts() {
    const response = await fetch(topPodcastsURL, { method: "GET" })
      .then(response => response.json());

    return response.feed.entry;
  },

  async getPodcastDetail(podcastId) {
    const response = await fetch(`${allowOriginsURL}/raw?url=` + encodeURIComponent(`${apiHostURL}/lookup?id=${podcastId}&${episodesFiltersURL}`), { method: "GET" })
      .then(response => response.json());

    // Extract and divide podcast from its episodes
    const podcast = response.results.find((res) => res.wrapperType === TYPE_PODCAST);
    const episodeList =
      response.results.filter((res) => res.wrapperType === TYPE_EPISODE) ?? [];

    return { podcast, episodeList };
  }

}