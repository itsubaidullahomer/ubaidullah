import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "../constants/Index";
import { getLocalStorage } from "../components/shared/localStorage/LocalStorage";

export const TAG_TYPES = {
  Order: "Order",
  Category: "Category",
  Gallery: "Gallery",
  RestaurantImage: "RestaurantImage",
  DeliveryPostCode: "DeliveryPostCode",
  Restaurant: "Restaurant",
  RestaurantTable: "RestaurantTable",
  RestaurantFeature: "RestaurantFeature",
  ProductAccessory: "ProductAccessory",
  SizeGroup: "SizeGroup",
  Size: "Size",
  OpeningHour: "OpeningHour",
  Product: "Product",
  Team: "Team",
  Module: "Module",
  Topic: "Topic",
  TopicExercise: "TopicExercise",
  LearningJourney: "LearningJourney",
  Activity: "Activity",
  UserCourse: "UserCourse",
  TeamUser: "TeamUser",
  ActivityType: "ActivityType",
  GlobalSettings: "GlobalSettings",
  PoscAdmin: "PoscAdmin",
  Admin: "Admin",
  Contact: "Contact",
  OwnerCard: "OwnerCard",
  User: "User",
} as const;

export type TagTypes = (typeof TAG_TYPES)[keyof typeof TAG_TYPES];

function providesList<T extends { id: string | number }>(
  resultsWithIds: T[] | undefined,
  tagType: TagTypes
) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const adminDzfood = createApi({
  reducerPath: "adminDzfood",
  tagTypes: Object.values(TAG_TYPES),
  baseQuery: fetchBaseQuery({
    baseUrl: `${Config.serverApiUrl}admin/`,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const storedToken = getLocalStorage(Config.userToken);

      if (storedToken && endpoint !== "refresh")
        headers.set("Authorization", `Bearer ${storedToken}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => "me",
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
    userLogin: builder.mutation<any, any>({
      query(body) {
        return { url: `login`, method: "POST", body };
      },
    }),
    getAllCategories: builder.query<any, void>({
      query: () => "admin-categories",
      transformResponse: (res: any) => {
        return res.data;
      },
      providesTags: (result) =>
        providesList(result?.data?.adminCategories, TAG_TYPES.Category),
    }),
    getCategory: builder.query<any, string>({
      query: (id) => `admin-categories/${id}`,
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
    addCategory: builder.mutation<any, any>({
      query: (body) => ({
        url: `admin-categories`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: TAG_TYPES.Category, id: "LIST" }],
    }),
    updateCategory: builder.mutation<any, any>({
      query: (body) => ({
        url: `update-category`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: TAG_TYPES.Category, id: "LIST" }],
    }),
    orderCategory: builder.mutation<any, any>({
      query: (body) => ({
        url: `order-categories`,
        method: "POST",
        body,
      }),
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `admin-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: TAG_TYPES.Category, id: "LIST" }],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUserLoginMutation,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useOrderCategoryMutation,
  useDeleteCategoryMutation,
} = adminDzfood;
