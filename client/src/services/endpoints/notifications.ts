import { AxiosInstance } from "axios";

export function notificationsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getUnreadNotifications: async (userId) => {
      const response = await axiosInstance.get(
        `/notifications/${userId}/unread`
      );
      return { notifications: response.data };
    },

    markNotificationAsRead: async (notificationId) => {
      const response = await axiosInstance.patch(
        `/notifications/${notificationId}/mark`
      );
      return response.data;
    },
  };
}
