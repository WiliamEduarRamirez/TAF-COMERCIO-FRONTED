import { Component, Vue } from 'vue-property-decorator';

@Component
class FormatMixin extends Vue {
  formatDate(date: string | null, empty: boolean) {
    // salida dd/mm/aaaa
    if (!date) return empty ? '' : '-';
    const format = new Date(date);
    const time = `${format.toISOString().substr(0, 10)}`;
    const [year, month, day] = time.split('-');
    return `${day}/${month}/${year}`;
  }
  formatDatePicker(date: string | null) {
    if (!date) return new Date().toISOString().substr(0, 10);
    const format = new Date(date);
    return format.toISOString().substr(0, 10);
  }
  formatDateLocal(date: string, showHour = true): string {
    if (!date) return '-';
    const format = new Date(date);
    const zone = format.getTimezoneOffset();
    format.setHours(format.getHours() - zone / 60);
    let day: string | null = '',
      hour: string | null = '';
    hour = this.format24Hours(format.toISOString().substr(11, 5));
    day = this.formatDay(format.toISOString().substr(0, 10));
    return showHour ? `${day} ${hour}` : `${day}`;
  }
  formatDay(date: string): string | null {
    if (!date) return null;
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  format24Hours(date: string, showSeg = false, delimit = ':'): string | null {
    if (!date) return null;
    const [hour, min, seg] = date.split(delimit);
    let H: string | number = Number.parseInt(hour);
    H = H < 10 ? '0' + H : H;
    return `${H}:${min}${showSeg ? ':' + seg : ''}`;
  }
  formatDecimal(decimal: number | null): number | string {
    if (!decimal) return 0;
    return decimal.toFixed(2);
  }

  isNull(data: any): any {
    return data ? data : '-';
  }

  isEmpty(data: any): any {
    return data ? data : '';
  }

  setIsNull(data: any): any {
    if (!data || data === '') {
      return null;
    }
    return data;
  }
}
export default FormatMixin;
