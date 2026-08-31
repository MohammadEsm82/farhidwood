import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  RefreshCw,
  Phone,
  User,
  CalendarDays,
  MessageSquare,
  AlertCircle,
  LoaderCircle,
  Search,
  X,
} from "lucide-react";

import { API_URL as API } from "../../config/api";

const authHeaders = () => {
  const token = localStorage.getItem("adminToken");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      setError("");

      const response = await fetch(`${API}/messages`, {
        method: "GET",
        credentials: "include",
        headers: {
          ...authHeaders(),
        },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        throw new Error("نشست مدیریت معتبر نیست. دوباره وارد شوید.");
      }

      if (!response.ok) {
        throw new Error(data.message || "دریافت پیام‌ها انجام نشد.");
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error("ADMIN MESSAGES ERROR:", error);
      setError(error.message || "دریافت پیام‌ها با مشکل مواجه شد.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const unreadCount = useMemo(
    () => messages.filter((message) => !message.isRead).length,
    [messages]
  );

  const filteredMessages = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return messages;

    return messages.filter((message) =>
      [
        message.name,
        message.phone,
        message.email,
        message.subject,
        message.message,
      ]
        .filter(Boolean)
        .some((item) =>
          item.toString().toLowerCase().includes(value)
        )
    );
  }, [messages, search]);

  const handleRead = async (messageId, isRead) => {
    try {
      const endpoint = isRead ? "unread" : "read";

      const response = await fetch(
        `${API}/messages/${messageId}/${endpoint}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            ...authHeaders(),
          },
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        throw new Error("نشست مدیریت معتبر نیست.");
      }

      if (!response.ok) {
        throw new Error(
          data.message || "تغییر وضعیت پیام انجام نشد."
        );
      }

      setMessages((prev) =>
        prev.map((message) =>
          message._id === messageId
            ? { ...message, isRead: !isRead }
            : message
        )
      );

      if (selectedMessage?._id === messageId) {
        setSelectedMessage((prev) => ({
          ...prev,
          isRead: !isRead,
        }));
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm("آیا از حذف این پیام مطمئن هستید؟")) return;

    try {
      const response = await fetch(
        `${API}/messages/${messageId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            ...authHeaders(),
          },
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        throw new Error("نشست مدیریت معتبر نیست.");
      }

      if (!response.ok) {
        throw new Error(data.message || "حذف پیام انجام نشد.");
      }

      setMessages((prev) =>
        prev.filter((message) => message._id !== messageId)
      );

      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "حذف پیام انجام نشد.");
    }
  };

  const openMessage = async (message) => {
    setSelectedMessage(message);

    if (!message.isRead) {
      await handleRead(message._id, false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[600px] items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle size={42} className="animate-spin text-primary" />
          <p className="text-sm text-white/40">
            در حال دریافت پیام‌ها...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <MessageSquare size={28} className="text-primary" />
            <h1 className="text-2xl font-black sm:text-3xl">
              پیام‌های تماس
            </h1>

            {unreadCount > 0 && (
              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-black">
                {unreadCount}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-white/40">
            پیام‌ها و درخواست‌های ارسال‌شده از سایت
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchMessages(true)}
          disabled={refreshing}
          className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/60 transition hover:border-primary/40 hover:text-primary disabled:opacity-50"
        >
          <RefreshCw
            size={17}
            className={refreshing ? "animate-spin" : ""}
          />
          بروزرسانی
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          <AlertCircle size={19} />
          {error}
        </div>
      )}

      <div className="relative mb-6 max-w-xl">
        <Search
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی نام، شماره، ایمیل یا متن پیام..."
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3.5 pr-12 pl-4 text-sm text-white outline-none transition focus:border-primary/50"
        />
      </div>

      {filteredMessages.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.03] text-center">
          <Mail size={50} className="text-white/15" />
          <h2 className="mt-5 text-xl font-bold">پیامی وجود ندارد</h2>
          <p className="mt-2 text-sm text-white/30">
            هنوز پیامی از طریق فرم تماس دریافت نشده است.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <article
              key={message._id}
              onClick={() => openMessage(message)}
              className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                message.isRead
                  ? "border-white/10 bg-white/[0.02]"
                  : "border-primary/20 bg-primary/[0.04]"
              } hover:-translate-y-0.5 hover:border-primary/30`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      message.isRead
                        ? "bg-white/5 text-white/40"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {message.isRead ? (
                      <MailOpen size={21} />
                    ) : (
                      <Mail size={21} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-white">
                        {message.name}
                      </h3>

                      {!message.isRead && (
                        <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-black">
                          جدید
                        </span>
                      )}
                    </div>

                    {message.subject && (
                      <p className="mt-1 font-medium text-white/60">
                        {message.subject}
                      </p>
                    )}

                    <p className="mt-2 line-clamp-1 text-sm text-white/30">
                      {message.message}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-2">
                    <Phone size={14} />
                    <span dir="ltr">{message.phone}</span>
                  </span>

                  <span className="hidden items-center gap-2 sm:flex">
                    <CalendarDays size={14} />
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedMessage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#111] p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs tracking-[3px] text-primary">
                  CONTACT MESSAGE
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {selectedMessage.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/50 transition hover:bg-red-500 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Info
                icon={<User size={17} />}
                label="نام"
                value={selectedMessage.name}
              />

              <Info
                icon={<Phone size={17} />}
                label="شماره تماس"
                value={selectedMessage.phone}
                dir="ltr"
              />

              {selectedMessage.email && (
                <Info
                  icon={<Mail size={17} />}
                  label="ایمیل"
                  value={selectedMessage.email}
                  dir="ltr"
                />
              )}

              <Info
                icon={<CalendarDays size={17} />}
                label="تاریخ"
                value={formatDate(selectedMessage.createdAt)}
              />
            </div>

            {selectedMessage.subject && (
              <div className="mt-6">
                <p className="mb-2 text-xs text-white/30">موضوع</p>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                  {selectedMessage.subject}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="mb-2 text-xs text-white/30">متن پیام</p>
              <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-8 text-white/70">
                {selectedMessage.message}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  handleRead(
                    selectedMessage._id,
                    selectedMessage.isRead
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 py-3 text-sm text-primary transition hover:bg-primary hover:text-black"
              >
                {selectedMessage.isRead ? (
                  <>
                    <Mail size={17} />
                    علامت‌گذاری به عنوان خوانده‌نشده
                  </>
                ) : (
                  <>
                    <MailOpen size={17} />
                    علامت‌گذاری به عنوان خوانده‌شده
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(selectedMessage._id)}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-3 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={17} />
                حذف پیام
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ icon, label, value, dir }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-xs text-primary">
        {icon}
        <span>{label}</span>
      </div>

      <p dir={dir} className="mt-2 truncate text-sm text-white/70">
        {value}
      </p>
    </div>
  );
}
