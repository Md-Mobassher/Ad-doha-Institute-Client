import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-Types";

const videosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVideo: build.mutation({
      query: (data) => ({
        url: "/videos/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.video],
    }),

    getAllVideos: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/videos",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.video],
    }),

    getSingleVideo: build.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.video],
    }),

    deleteVideo: build.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.video],
    }),

    updateVideo: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.video],
    }),
  }),
});

export const {
  useCreateVideoMutation,
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  useDeleteVideoMutation,
  useUpdateVideoMutation,
} = videosApi;
