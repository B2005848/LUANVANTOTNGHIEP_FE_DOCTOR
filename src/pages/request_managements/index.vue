<template>
  <div class="chat-list-container">
    <h2>Hỗ trợ bệnh nhân</h2>
    <div v-if="chatPairs.length > 0" class="chat-list mt-5">
      <ul>
        <li
          v-for="contact in chatPairs"
          :key="contact.contact_id"
          @click="selectChat(contact.contact_id)"
          class="chat-item"
        >
          <div class="chat-info row">
            <div class="tw-flex tw-items-center tw-gap-4">
              <img
                class="tw-w-10 tw-h-10 tw-rounded-full"
                :src="`http://localhost:3000${contact.image_avt}`"
                alt="Avatar"
              />
              <div class="tw-font-medium tw-dark:text-white">
                <div v-if="contact.first_name && contact.last_name">
                  {{ contact.first_name + " " + contact.last_name }}
                </div>

                <div v-if="!contact.first_name && !contact.last_name">
                  {{ contact.contact_id }}
                </div>
                <div class="tw-ext-sm tw-text-gray-700 tw-dark:text-gray-400">
                  {{ contact.last_message }}
                </div>
              </div>
            </div>
          </div>
          <span class="timestamp">{{ formatDateTime(contact.timestamp) }}</span>
        </li>
      </ul>
    </div>

    <div v-else>Không có bệnh nhân nào cần hỗ trợ cả</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import Cookies from "js-cookie"; // Import thư viện js-cookie
import { io } from "socket.io-client"; // Import Socket.IO client
import { useRouter } from "vue-router";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const router = useRouter();
// Lấy ID người gửi từ cookie
const senderId = Cookies.get("staffId");

if (!senderId) {
  console.error("SenderId not found in cookies!");
}

// State quản lý danh sách cặp hội thoại
const chatPairs = ref([]); // Danh sách các cặp hội thoại

// Tạo kết nối với server qua Socket.IO
const socket = io("http://localhost:3000");

// Hàm gọi API lấy danh sách cặp hội thoại
const fetchChatPairs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/messages/chatPairs",
      {
        params: { senderId },
      }
    );

    if (response.data.status) {
      chatPairs.value = response.data.data.map((item) => ({
        contact_id: item.contact_id,
        first_name: item.first_name,
        last_name: item.last_name,
        last_message: item.last_message,
        timestamp: item.last_message_time,
        image_avt: item.image_avt,
      }));
    } else {
      console.error("Error fetching chat pairs:", response.data.message);
    }
  } catch (error) {
    console.error("API Error:", error);
  }
};

// Lắng nghe sự kiện "new_chat_pair" từ server
const listenForNewChatPairs = () => {
  socket.on("new_chat_pair", (newChatPair) => {
    console.log("New chat pair received:", newChatPair);

    // Kiểm tra nếu đoạn chat mới đã tồn tại trong danh sách không
    const existingChat = chatPairs.value.find(
      (pair) => pair.contact_id === newChatPair.contact_id
    );

    if (!existingChat) {
      // Thêm đoạn chat mới vào danh sách cặp hội thoại
      chatPairs.value.push({
        contact_id: newChatPair.contact_id,
        first_name: newChatPair.first_name,
        last_name: newChatPair.last_name,
        last_message: newChatPair.last_message,
        timestamp: newChatPair.timestamp,
        image_avt: newChatPair.image_avt,
      });
    } else {
      // Cập nhật đoạn chat nếu nó đã tồn tại
      existingChat.last_message = newChatPair.last_message;
      existingChat.timestamp = newChatPair.timestamp;
    }
  });
};

// Hàm xử lý khi chọn một cặp hội thoại
const selectChat = (contactId) => {
  console.log("Selected Chat:", contactId);
  // Điều hướng đến route chatcontent/:id
  router.push({
    name: "admin.chat", // Tên route đã định nghĩa trong Vue Router
    params: { id: contactId }, // Truyền contactId làm tham số
  });
};

// Lấy danh sách cặp hội thoại khi component được mount
onMounted(() => {
  if (senderId) {
    fetchChatPairs();
  }

  // Tham gia room của người dùng
  socket.emit("join", { userId: senderId, role: "staff" });

  // Lắng nghe các sự kiện từ server
  listenForNewChatPairs();
});

// Ngắt kết nối socket khi component bị hủy
onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style scoped>
.chat-list-container {
  margin: 20px;
}
.chat-list ul {
  list-style-type: none;
  padding: 5px;
  background-color: #00afef;
  border-radius: 14px;
}
.chat-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
}
.chat-item:hover {
  padding: 10px;
  background-color: #9ee2f4;
  border-radius: 14px;
}
.chat-info {
  max-width: 70%;
}
.timestamp {
  color: rgb(240, 240, 240);
  font-size: 0.9em;
}
</style>
