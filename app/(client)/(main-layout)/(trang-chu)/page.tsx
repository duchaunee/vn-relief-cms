import MenuItem from "./_components/menu-item";
import MenuSection from "./_components/menu-section";

export default function Page() {
  return (
    <div className="flex flex-1 gap-4 p-4 w-full">
      <div className="p-4 w-full">
        <MenuSection number="1" title="CỨU TRỢ THIÊN TAI" emoji="⭐">
          <MenuItem
            icon="https://lh3.googleusercontent.com/UVGf7l4LVtEv9TNgHXGxig58_YPSHOlBE2gk_GOUYvHjLxvKxa6qZX4-3hJuL4w=w0"
            title="Các nơi đang cần cứu trợ khẩn cấp"
            href="/cuu-tro-khan-cap"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/6QWTM6OmR3_Jt62KF9-Ud0Wa-Kl8cq_dXADWh4jU9WsSd6fUXPlcuPwmUDslk-s=w0"
            title="Các nơi đang cần hỗ trợ khắc phục sau thiên tai"
            href="/can-ho-tro"
          />
        </MenuSection>

        <MenuSection number="2" title="NHÂN LỰC CỨU TRỢ" emoji="⭐">
          <MenuItem
            icon="https://lh3.googleusercontent.com/4i3WDya4lJn1ck9cipnwxzfUdD0jhfhF-T-FOjYzkC049H-n0vX31SrzT45_gw=w0"
            title="Thông tin liên hệ các đội cứu trợ"
            href="/doi-cuu-tro"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/7AuFg5i-v1Z06oEJwffdDBTlBddwxVYp4L8_5lZ2G6zmc-jTsp3OYEgxzl1DAg=w0"
            title="Thông tin liên hệ các tình nguyện viên"
            href="/tinh-nguyen-vien"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/XqzJ3lVyrxSgPvlOOx8GYbQWbBZ2ga_aRSLUCgtmFbUdJRrbQKek4Mx74ppSHA=w0"
            title="Danh sách các phương tiện hỗ trợ"
            href="/phuong-tien"
          />
        </MenuSection>

        <MenuSection number="3" title="ĐỊA ĐIỂM HỖ TRỢ" emoji="⭐">
          <MenuItem
            icon="https://lh3.googleusercontent.com/UhvEESApICEu2fhf8_8o1GBmUdSVjR4bc_MKqKZPzzOOgzw8uVCo8E0k8ZmpFVMt=w0"
            title="Danh sách các địa điểm tạm trú"
            href="/dia-diem-tam-tru"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/d/1Zy8XMQ7U3n1ZGB6hYNQEEcgEwo-rckq9"
            title="Danh sách các địa điểm dừng chân"
            href="/dia-diem-dung-chan"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/N6QQh7NYnb_ch4U3zmO6obLCWNvpw_4Agmi0PO9DsG6a9LYnfFd7hqE_b2W7Dw=w0"
            title="Danh sách các địa điểm tập kết"
            href="/dia-diem-tap-ket"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/d/1e-m1phvEEQ6AzfGn-PEFXI1nFHEEQt1u"
            title="Danh sách các địa điểm tiếp tế lương thực"
            href="/dia-diem-tiep-te"
          />
        </MenuSection>

        <MenuSection number="4" title="THÔNG TIN THIÊN TAI" emoji="⭐">
          <MenuItem
            icon="https://lh3.googleusercontent.com/d/1IjXaXTgMmk1QpP6KE4YL7GBcXeGLZUA8"
            title="Thông tin liên lạc chính quyền các khu vực"
            href="/lien-lac-chinh-quyen"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/d/1a3yHP-wwIesUDKA75uT8JICxg9MKNfW9"
            title="Thông tin chi tiết ủng hộ thiên tai"
            href="/ung-ho-thien-tai"
          />
          <MenuItem
            icon="https://lh3.googleusercontent.com/d/16pCNJiIljLgfcRS673k641qeOdLBWejY"
            title="Tổng hợp tin tức cập nhật thiên tai"
            href="/tin-tuc-thien-tai"
          />
        </MenuSection>
      </div>
    </div>
  );
}
