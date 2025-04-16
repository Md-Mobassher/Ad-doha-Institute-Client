import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/contact";

const contactsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (data) => ({
        url: `/${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.contact],
    }),

    getAllContacts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/${URL}`,
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TContact[], meta: IMeta) => {
      //   return {
      //     contacts: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.contact],
    }),

    deleteContact: build.mutation({
      query: (id) => ({
        url: `/${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.contact],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
