import { Component, Emit, Vue } from 'vue-property-decorator';
@Component
export default class CustomModalChangeStatus extends Vue {
  dialog = true;
  value: string | null = null;
  name: string | null = null;
  status = false;
  loading = false;

  @Emit('action-modal')
  actionModal(): void {}

  open(value: string, name: string, status: boolean): void {
    this.name = name;
    this.value = value;
    this.status = status;
    this.dialog = true;
  }
  close(): void {
    this.loading = false;
    this.value = null;
    this.status = false;
    this.dialog = false;
  }
  setLoading(value: boolean): void {
    this.loading = value;
  }
  onClickModal(): void {
    this.setLoading(true);
    this.actionModal();
  }
}
