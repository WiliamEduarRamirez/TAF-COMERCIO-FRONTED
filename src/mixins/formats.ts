import { Component, Vue } from 'vue-property-decorator';

@Component
class Formats extends Vue {
  formatDateLocal(date: string): string {
    if (!date) return '-';
    const format = new Date(date);
    const zone = format.getTimezoneOffset();
    format.setHours(format.getHours() - zone / 60);
    let day: string | null = '',
      hour: string | null = '';
    hour = this.format24Hours(format.toISOString().substr(11, 5));
    day = this.formatDay(format.toISOString().substr(0, 10));
    return `${day} ${hour}`;
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
}
export default Formats;
