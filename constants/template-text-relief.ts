export const templateTextRelief = <T>(data: T) => {
  const { id, address, phone, description, title, contentNeedsRelief, url } =
    data as {
      id: string;
      address: string;
      phone: string;
      title: string;
      description: string;
      contentNeedsRelief: string;
      url: string;
    };

  return `
🆔 ID thông tin cần cứu trợ: VN${id?.slice(0, 3)}

✅ Trạng thái hiện tại: Đã xác minh - Đang tìm đội cứu trợ
🗺️ Khu vực cần cứu trợ: ${address}
🌊 Mô tả tình trạng hiện tại: ${description}
🆘 Nội dung cần cứu trợ: ${contentNeedsRelief}
📞 SĐT liên lạc: ${phone}
🕗 Cập nhật tiến độ cứu trợ: ${title}

[🚩Tọa độ vị trí, hình ảnh đính kèm trong trang thông tin cứu trợ]
Mọi người khi copy chia sẻ thông tin cứu trợ có sự xác minh✅, được cập nhật tránh sự chồng chéo⚠️, nhiễu loạn thông tin❌ 
=> ĐẢM BẢO HIỆU QUẢ CÔNG TÁC CỨU TRỢ❗

Xem cập nhật tình hình cứu trợ của trường hợp này tại: ${url}
`;
};
