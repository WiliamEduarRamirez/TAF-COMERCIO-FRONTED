<template>
  <v-row>
    <v-col cols="12" v-if="!file && !loading">
      <div class="dropzone" @dragover.prevent>
        <span>Drag or Drop File</span>
        <span>OR</span>
        <label for="dropzoneFile">Select File</label>
        <input @change="onFileSelected" type="file" id="dropzoneFile" class="dropzoneFile" />
      </div>
    </v-col>
    <v-col cols="12" class="text-center" v-if="!file && loading">
      <custom-progress-circular></custom-progress-circular>
    </v-col>
    <v-col cols="12" v-if="file && !loading">
      <v-img contain width="300" :src="file">
        <v-btn @click="remove" color="error" fab small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-img>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import CustomProgressCircular from '@/common/custom-progress-circular/CustomProgressCircular.vue';
import sleep from '@/functions/sleep';
@Component({
  components: { CustomProgressCircular },
})
export default class CustomDropzone extends Vue {
  file: string | null = null;
  loading = false;

  @Emit()
  inputFile(file: File): File {
    return file;
  }
  @Emit('remove')
  remove(): void {
    this.file = null;
  }

  resetValues(): void {
    this.file = null;
    this.loading = false;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async onFileSelected(event: any): Promise<void> {
    this.loading = true;
    const file: File = event.target.files[0];
    await sleep(1000);
    this.file = URL.createObjectURL(file);
    this.loading = false;
    this.inputFile(file);
  }
}
</script>

<style scoped lang="scss">
.dropzone {
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #41b883;
  background-color: #fff;
  transition: 0.3s ease all;
  label {
    padding: 8px 12px;
    color: #fff;
    background-color: #41b883;
    transition: 0.3s ease all;
  }
  input {
    display: none;
  }
}
.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #41b883;
  label {
    background-color: #fff;
    color: #41b883;
  }
}
</style>
