import { Controller, Get } from "@nestjs/common";

@Controller(".well-known")
export class WellKnownController {
  @Get("assetlinks.json")
  assetlinks() {
    return [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "com.seogaemo.hackseoul_android",
          sha256_cert_fingerprints: [
            "3D:41:D2:E9:0C:01:88:96:AE:06:50:A2:BF:4B:38:9B:7B:E2:5A:9E:FA:02:20:D2:7E:AE:E0:F4:72:D7:F8:E7",
          ],
        },
      },
    ];
  }
}
