<template>
  <div class="chat-container card">
    <div class="chat-header d-flex">
      <div v-if="inforPatient && inforPatient.patient_id">
        <router-link
          class="tw-flex tw-items-center tw-gap-4"
          :to="{
            name: 'admin.patient_details',
            params: { username: inforPatient.patient_id },
          }"
        >
          <img
            class="tw-w-10 tw-h-10 tw-rounded-full"
            :src="`http://localhost:3000${inforPatient.image_avt}`"
            alt=""
          />
          <div class="tw-font-medium tw-dark:text-white">
            <div>
              <h4>{{ contactName }}</h4>
            </div>
          </div>
        </router-link>
      </div>

      <div>
        <div class="btn-delele">
          <button style="color: #dc143c">Xóa</button>
        </div>
      </div>
    </div>
    <div class="chat-content" ref="chatContent" @scroll="handleScroll">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'message',
          message.sender_id == senderId ? 'sent' : 'received',
          message.isSending ? 'sending' : '',
        ]"
      >
        <p class="message-content">{{ message.content }}</p>
        <span class="message-timestamp">{{
          formatTime(message.timestamp)
        }}</span>
      </div>
      <div v-if="isLoading" class="loading-spinner">Đang tải...</div>
    </div>
    <div class="chat-input">
      <textarea
        v-model="newMessage"
        placeholder="Nhập tin nhắn..."
        @keyup.enter="sendMessage"
      ></textarea>
      <button @click="sendMessage">Gửi</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import axios from "axios";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
import formatDate from "@/helper/format-datetime";

const formatTime = formatDate.formatTime;
const route = useRoute();
const senderId = "Admin";

const socket = io("http://localhost:3000");

// Biến dữ liệu
const contactId = route.params.id;
const contactName = ref("Tên người nhận");
const inforPatient = ref([]);
const messages = ref([]);
const newMessage = ref("");
const currentPage = ref(1);
const hasMorePages = ref(true);
const isLoading = ref(false);
const chatContent = ref(null);

// Kiểm tra cuộn lên để tải thêm tin nhắn cũ
const handleScroll = () => {
  const chatContentEl = chatContent.value;
  if (chatContentEl && chatContentEl.scrollTop === 0 && hasMorePages.value) {
    fetchMessages(true); // Load thêm tin nhắn cũ khi cuộn lên đầu
  }
};

// Lấy danh sách tin nhắn
const fetchMessages = async (isLoadMore = false) => {
  if (isLoading.value || !hasMorePages.value) return;

  isLoading.value = true;

  try {
    const response = await axios.get(
      "http://localhost:3000/api/messages/getMessages",
      {
        params: { senderId, receiverId: contactId, page: currentPage.value },
      }
    );

    if (response.data.status) {
      const newMessages = response.data.listMessages;

      // Đảo ngược thứ tự tin nhắn mới lấy về, vì chúng sẽ được sắp xếp theo thứ tự mới nhất đầu tiên
      const reversedMessages = newMessages.reverse();

      if (isLoadMore) {
        // Thêm tin nhắn cũ vào đầu mảng tin nhắn hiện tại
        messages.value = [...reversedMessages, ...messages.value];
      } else {
        // Cập nhật tin nhắn mới, tin nhắn mới nhất sẽ ở dưới cùng
        messages.value = reversedMessages;
        nextTick(() => {
          scrollToBottom(); // Cuộn xuống khi tin nhắn mới được tải
        });
      }

      if (newMessages.length < 10) {
        hasMorePages.value = false; // Không còn trang tin nhắn cũ
      } else {
        currentPage.value += 1; // Tiến đến trang tiếp theo
      }
    } else {
      console.error("Error fetching messages:", response.data.message);
    }
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    isLoading.value = false;
  }
};

// Gửi tin nhắn mới
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const tempId = Date.now();
  const tempMessage = {
    id: tempId,
    sender_id: senderId,
    content: newMessage.value.trim(),
    timestamp: new Date().toLocaleString(),
    isSending: true,
  };

  messages.value.push(tempMessage);
  newMessage.value = "";

  nextTick(() => {
    scrollToBottom();
  });

  try {
    const response = await axios.post(
      "http://localhost:3000/api/messages/sendMessage",
      {
        senderId,
        senderType: "staff",
        receiverId: contactId,
        receiverType: "patient",
        content: tempMessage.content,
      }
    );

    if (response.data.status) {
      const sentMessage = messages.value.find((msg) => msg.id === tempId);
      sentMessage.id = response.data.message.id;
      sentMessage.isSending = false;
    } else {
      console.error("Failed to send message:", response.data.message);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    const failedMessage = messages.value.find((msg) => msg.id === tempId);
    failedMessage.isSending = false;
  }
};

// Lắng nghe tin nhắn mới
const listenForMessages = () => {
  socket.on("receive_message", (message) => {
    if (message.sender_id === contactId || message.receiver_id === contactId) {
      messages.value.push(message);
      nextTick(() => {
        scrollToBottom();
      });
    }
  });

  socket.on("disconnect", () => {
    console.warn("Socket disconnected. Reconnecting...");
    socket.connect();
  });
};

// Cuộn xuống cuối
const scrollToBottom = () => {
  const chatContentEl = chatContent.value;
  if (chatContentEl) {
    chatContentEl.scrollTop = chatContentEl.scrollHeight;
  }
};

// Lấy thông tin người nhận
const getNamePatientChat = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/patient/getinfo/${contactId}`
    );
    if (response.status === 200) {
      inforPatient.value = response.data.dataInfo;
      contactName.value =
        response.data.dataInfo.first_name +
        " " +
        response.data.dataInfo.last_name;
    }
    console.log("Patient ID:", inforPatient.value.patient_id);
  } catch (error) {
    console.error("Error fetching patient info:", error);
  }
};

// Khi component được mount
onMounted(() => {
  console.log(senderId);
  getNamePatientChat();
  const chatContentEl = chatContent.value;
  if (chatContentEl) {
    chatContentEl.addEventListener("scroll", handleScroll); // Lắng nghe sự kiện cuộn
  }

  socket.emit("join", { userId: senderId, role: "staff" });
  fetchMessages();
  listenForMessages();
});

// Ngắt kết nối khi component bị hủy
onBeforeUnmount(() => {
  socket.disconnect();
  const chatContentEl = chatContent.value;
  if (chatContentEl) {
    chatContentEl.removeEventListener("scroll", handleScroll); // Hủy lắng nghe sự kiện cuộn
  }
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding: 10px;
  background-color: #f1f1f1;
  justify-content: space-between;
}

.chat-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Tạo khoảng cách giữa các tin nhắn */
}

.message {
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
  word-wrap: break-word;
  display: inline-block;
  position: relative;
}

.message.sent {
  align-self: flex-end; /* Căn chỉnh tin nhắn gửi sang bên phải */
  background-color: #c5e0ff;
}

.message.received {
  align-self: flex-start; /* Căn chỉnh tin nhắn nhận sang bên trái */
  background-color: #eeecec;
}

.message.sending {
  opacity: 0.6;
}

.message-timestamp {
  font-size: 0.8em;
  color: #000000;
  text-align: right;
  margin-top: 5px;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.chat-input textarea {
  flex-grow: 1;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
}

.chat-input button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}

a {
  text-decoration: none;
  color: #2c2d2e;
}
</style>
