<template>
  <div class="dropzone" @dragover.prevent>
    <span>Drag or Drop File</span>
    <span>OR</span>
    <label for="dropzoneFile">Select File</label>
    <input @change="onFileSelected" type="file" id="dropzoneFile" class="dropzoneFile" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class CustomDropzone extends Vue {
  @Emit()
  inputFile(file: File): File {
    return file;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
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
