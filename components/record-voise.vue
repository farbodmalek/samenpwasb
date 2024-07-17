<template><input type="file" accept="audio/*" capture="microphone">
  <div class="recorder-container">
    <button @click="toggleRecording">{{ isRecording ? 'متوقف کردن ضبط' : 'شروع ضبط' }}</button>

    <div v-if="audioUrl" class="audio-player">
      <div class="audio-info">
        <audio ref="audioPlayer" :src="audioUrl" @timeupdate="updateProgress"></audio>
        <div class="progress-bar" @click="seek">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="audio-controls">
          <button @click="playPause" class="play-pause-button">
            <span v-if="!isPlaying">▶️</span>
            <span v-else>⏸️</span>
          </button>
          <div class="audio-time">{{ currentTime }}</div>
          <button @click="deleteRecording" class="delete-button">حذف</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isRecording = ref(false);
const audioUrl = ref(null);
const progress = ref(0);
const isPlaying = ref(false);
const currentTime = ref('00:00');
const audioPlayer = ref(null);
let mediaRecorder;
let audioChunks = [];

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    audioUrl.value = URL.createObjectURL(audioBlob);
    audioChunks = [];
  };

  mediaRecorder.start();
};

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
};

const toggleRecording = () => {
  if (!isRecording.value) {
    startRecording();
  } else {
    stopRecording();
  }
  isRecording.value = !isRecording.value;
};

const updateProgress = () => {
  progress.value = (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100;
  currentTime.value = formatTime(audioPlayer.value.currentTime);
};

const seek = (event) => {
  const progressBar = event.currentTarget;
  const clickPosition = event.offsetX / progressBar.offsetWidth;
  audioPlayer.value.currentTime = clickPosition * audioPlayer.value.duration;
};

const playPause = () => {
  if (!isPlaying.value) {
    audioPlayer.value.play();
  } else {
    audioPlayer.value.pause();
  }
  isPlaying.value = !isPlaying.value;
};

const deleteRecording = () => {
  audioUrl.value = null;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};
</script>

<style scoped>
.recorder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

button:hover {
  background-color: #45A049;
}

.audio-player {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.audio-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

audio {
  display: none;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  position: relative;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 5px;
}

.audio-controls {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.play-pause-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.delete-button {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.audio-time {
  font-size: 14px;
  color: #555;
}
</style>


<!--<template>
  <div v-if="showInstructions" class="instructions">
    <div class="text-center" v-if="isIOS">
      <p >برای نصب برنامه، مراحل زیر را دنبال کنید:</p>
      <ol>
        <li>کلیک روی منوی مرورگر   <img src="/img/download.png" width="20" class="mx-2"></li>
        <li>انتخاب گزینه "Add to Home Screen"</li>
        <li>تایید نام و کلیک روی "add"</li>
        <li>برنامه به صفحه اصلی اضافه شد </li>
      </ol>
    </div>

    <div class="text-center" v-if="isAndroid">
      <p>برای نصب برنامه، مراحل زیر را دنبال کنید:</p>
      <ol>
        <li>کلیک روی منوی مرورگر (سه نقطه در گوشه بالا سمت راست یا بالا سمت چپ )</li>
        <li>انتخاب گزینه "افزودن به صفحه اصلی"</li>
        <li>برنامه به صفحه اصلی اضافه شد </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const isAndroid = ref(false);
const isIOS = ref(false);
const showInstructions = ref(true);

onMounted(() => {
  const userAgent = window.navigator.userAgent;
  isAndroid.value = /android/i.test(userAgent);
  isIOS.value = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;


  if (localStorage.getItem('instructionsShown') === 'true') {
    showInstructions.value = false;
  } else {
    localStorage.setItem('instructionsShown', 'true');
  }
});
</script>

<style lang="scss">
.instructions {
  text-align: right;
  direction: rtl;
  margin: 20px;

  h2, h3 {
    color: #333;
  }

  ol {
    margin-top: 10px;
    padding-left: 20px;
    list-style-type: decimal;

    li {
      margin-bottom: 10px;
    }
  }
}
</style>
-->