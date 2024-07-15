import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../key/key";

export const youtubeApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube-v31.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // for feed
    getFeed: builder.query({
      query: () => ({
        url: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN`,
      }),
    }),

    // for explore
    getExplore: builder.query({
      query: () => ({
        url: `/search?part=snippet&type=video&maxResults=50&regionCode=IN`,
      }),
    }),

    // for explore items
    getSearch: builder.query({
      query: (q) => ({
        url: `/search?q=${q}&part=snippet%2Cid&maxResults=50&regionCode=IN`,
      }),
    }),

    // for channel details
    getChannelDetails: builder.query({
      query: (id) => ({
        url: `channels?part=snippet%2Cstatistics&id=${id}`,
      }),
    }),

    // for channel videos to add on channel detail
    getChannelVideos: builder.query({
      query: (id) => ({
        url: `search?channelId=${id}&part=snippet%2Cid&maxResults=50&regionCode=IN`,
      }),
    }),

    // for video details
    getVideoDetails: builder.query({
      query: (id) => ({
        url: `/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`,
      }),
    }),

    // for related videos
    getRelatedVideos: builder.query({
      query: (id) => ({
        url: `/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=50&regionCode=IN`,
      }),
    }),
  }),
});

export const {
  useGetFeedQuery,
  useGetSearchQuery,
  useGetExploreQuery,
  useGetVideoDetailsQuery,
  useGetChannelDetailsQuery,
  useGetChannelVideosQuery,
  useGetRelatedVideosQuery,
} = youtubeApi;
