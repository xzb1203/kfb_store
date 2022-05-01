declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}
export const downloadFile = (fileName: string, type: 'pdf' | 'html' | 'txt' | 'xlsx', res: any) => {
  const url = window.URL.createObjectURL(
    new Blob([res.data, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }]),
  );
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', `${fileName}.${type}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
