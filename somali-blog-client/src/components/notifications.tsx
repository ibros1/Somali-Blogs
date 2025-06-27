import { useEffect, useState } from "react";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  avatarUrl?: string;
};

const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New Like",
    message: "John Doe liked your post.",
    time: "2h ago",
    isRead: false,
    avatarUrl: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    title: "New Comment",
    message: "Jane Smith commented on your photo.",
    time: "5h ago",
    isRead: true,
    avatarUrl: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    title: "Friend Request",
    message: "Alex Johnson sent you a friend request.",
    time: "1d ago",
    isRead: false,
    avatarUrl: "https://i.pravatar.cc/100?img=3",
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    // Simulate fetching notifications
    setNotifications(sampleNotifications);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h1>

        <div className="bg-white shadow rounded-xl divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-5 ${
                notification.isRead ? "bg-white" : "bg-blue-50"
              } hover:bg-blue-100 transition`}
            >
              <img
                src={notification.avatarUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-800">
                  {notification.title}
                </h2>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <span className="text-xs text-gray-400">
                  {notification.time}
                </span>
              </div>
              {!notification.isRead && (
                <span className="mt-1 w-2 h-2 rounded-full bg-blue-500"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
