import { AxiosInstance } from "axios";

export function notificationsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getUnreadNotifications: async (userId: string) => {
      const response = await axiosInstance.get(
        `/notifications/${userId}/unread`
      );
      return { notifications: response.data };
    },

    markNotificationAsRead: async (notificationId: string) => {
      const response = await axiosInstance.patch(
        `/notifications/${notificationId}/mark`
      );
      return response.data;
    },
  };
}
