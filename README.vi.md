# MailFlow Lab

MailFlow Lab là repository tham chiếu đã làm sạch, chỉ chạy dry-run, dùng để học quy trình phát triển phần mềm với AI coding agent có giới hạn và bằng chứng tất định.

Dự án mô phỏng một lát cắt nghiệp vụ: chuẩn bị danh sách người nhận, loại email không hợp lệ, bỏ qua email trùng sau khi chuẩn hóa, render preview an toàn và đối soát mọi dòng đầu vào. Repository không có SMTP client, endpoint production, credential, dữ liệu khách hàng hoặc đường gọi network.

Duy trì bởi [BrianV](https://github.com/vothienthanh), đồng thời là proving ground đầu tiên của [BrianV Agent Factory](https://github.com/vothienthanh/brianv-agent-factory).

## Chạy local

Yêu cầu Node.js 20 trở lên:

```bash
npm install
npm run check
```

Chạy demo với dữ liệu tổng hợp:

```bash
npm run demo
```

## Phạm vi hiện tại

- `MAX_RETRIES=0` là hợp lệ;
- chuẩn hóa email bằng trim và lowercase;
- dòng hợp lệ đầu tiên được giữ, dòng trùng phía sau bị skip;
- email invalid không tham gia duplicate key;
- template escape HTML mặc định;
- preview che một phần email;
- không gửi email và không gọi network.

UI, SMTP và tích hợp dữ liệu thật chưa thuộc phạm vi. Xem [feature spec](specs/MFL-001-skip-duplicates.md) và [provenance](docs/provenance.md).

## Giấy phép

Copyright 2026 BrianV. Apache-2.0.
