/* 网络安全各节大白话解释 + 记忆口诀 */
const STUDY_MEMOS = {
  "1-1": {
    plain: "CIA 就像<strong>保险箱三件套</strong>：机密性=别人偷看不到；完整性=东西没被偷偷换掉；可用性=你需要的时候能打开用。",
    memory: "CIA = <strong>机密、完整、可用</strong>。数据机密≠隐私，系统完整≠数据完整。"
  },
  "1-2": {
    plain: "攻击树像<strong>倒置决策树</strong>：根是黑客总目标，往下拆子目标。AND=全部得手才行，OR=有一条路通就行。",
    memory: "攻击树：<strong>根目标→子目标→叶动作</strong>。AND 全要，OR 任一。"
  },
  "1-3": {
    plain: "主动攻击是<strong>动手改/搞瘫</strong>系统（假冒、篡改、重放、DoS…）；被动攻击是<strong>只偷听</strong>不改动（监听、流量分析）。",
    memory: "主动 6 类记「<strong>假篡重拒会恶</strong>」；被动 3 类「<strong>听析泄</strong>」。"
  },
  "1-4": {
    plain: "黑客攻击像<strong>八步连环</strong>：先藏身份→摸底→找漏洞→拿权限→藏行踪→动手→留后门→擦脚印。",
    memory: "八阶段：<strong>藏→收→挖→取→隐→攻→门→清</strong>。"
  },
  "2-1": {
    plain: "很多防火墙<strong>不放 ICMP Echo</strong>，所以用 TCP/UDP 等非 ECHO 探测判断主机是否在线。",
    memory: "Non-ICMP ECHO = <strong>绕过禁 ping</strong>，还能探测路由器。"
  },
  "2-2": {
    plain: "Idle Scan 借<strong>第三方空闲主机</strong>的 IP 标识字段规律，让目标把应答发给假地址，扫描机自己隐身。",
    memory: "Idle Scan 核心：<strong>假冒中间主机 + IP ID 递增</strong>。"
  },
  "2-3": {
    plain: "栈指纹像<strong>看脚印认人</strong>：不同系统对同一探测包的响应细节不同，就能猜操作系统。",
    memory: "主动=发探测包；被动=嗅探正常流量。<strong>TCP/IP 栈 + ICMP 栈</strong>。"
  },
  "2-4": {
    plain: "扫描器本身不攻击，是<strong>体检仪</strong>找弱点；Nmap 扫端口，Wireshark 看包里装了什么。",
    memory: "Nmap=<strong>端口</strong>，Wireshark=<strong>协议分析</strong>，SuperScan=Windows 快速扫。"
  },
  "3-1": {
    plain: "缓冲区溢出是<strong>软件漏洞</strong>，像往小杯子猛灌水溢出来；漏洞本身不攻击，被人利用才变成攻击。",
    memory: "三句话：<strong>有漏洞 + 被利用 = 攻击</strong>。单独有漏洞不会自己出事。"
  },
  "3-2": {
    plain: "压缩病毒 CV 把宿主<strong>压一半再塞病毒</strong>，感染前后文件一样大，不容易被发现变大。",
    memory: "CV 隐身：<strong>压缩抵消病毒体积</strong>，大小几乎不变。"
  },
  "3-3": {
    plain: "DDoS 是<strong>僵尸网络海量请求</strong>把目标资源耗尽：要么吃光 CPU/内存，要么带宽被洪水堵死。",
    memory: "DDoS = <strong>C&C 指挥 + 肉鸡洪水</strong>。资源型 vs 带宽型。"
  },
  "4-1": {
    plain: "防火墙是<strong>驻地网和互联网之间的安检门</strong>，纵深防御的第一道可控边界。",
    memory: "防火墙 = <strong>遏制点 + 审计 + 隔离内外网</strong>。"
  },
  "4-2": {
    plain: "统计异常检测看<strong>行为像不像正常人</strong>（抓假冒用户好）；规则检测看<strong>有没有踩黑名单</strong>（抓违规用户好）。实际两种结合。",
    memory: "统计→<strong>假冒用户</strong>；规则→<strong>内部违规</strong>；<strong>两者结合</strong>。"
  },
  "4-3": {
    plain: "蜜罐是<strong>故意摆的假目标</strong>，引黑客过来，好观察手法、争取反应时间。",
    memory: "蜜罐三目的：<strong>转移、收集、拖时间</strong>。外网/内网都可部署。"
  },
  "5-1": {
    plain: "Kerberos 像<strong>游乐园通票</strong>：先在 AS 拿 TGT，再去 TGS 换各场馆门票，最后拿门票进服务。",
    memory: "三轮：<strong>AS 拿 TGT → TGS 换服务票 → 服务方验票</strong>。AS + TGS + 应用服务器。"
  },
  "5-2": {
    plain: "EAP 是<strong>认证大框架</strong>，不绑死一种登录方式，在数据链路层跑，很灵活。",
    memory: "EAP = <strong>多认证方式框架</strong>，跑在 PPP/802，不需 IP。"
  },
  "6-1": {
    plain: "TLS 上层三个管<strong>握手、改密码规格、报警</strong>；底层记录协议负责<strong>真正传数据</strong>。",
    memory: "TLS 上层：<strong>握手 + 改规 + 警报</strong>；下层：<strong>记录协议</strong>。"
  },
  "6-2": {
    plain: "HTTPS = HTTP + TLS，端口 <strong>443</strong>，URL、表单、Cookie、报头内容都加密。",
    memory: "HTTPS：<strong>443 端口，https://</strong>，SSL/TLS 之上 HTTP 本质一样。"
  },
  "6-3": {
    plain: "SSH 提供<strong>加密远程登录</strong>，强调前向保密——就算以后私钥泄露，过去的会话也解不开。",
    memory: "SSH = <strong>加密远程 + 前向保密</strong>。"
  },
  "6-4": {
    plain: "心跳协议在 TLS 记录层之上，用来<strong>探测对方还活着</strong>，握手阶段协商是否支持。",
    memory: "心跳 = <strong>请求/响应保活</strong>，握手时确定支持。"
  },
  "7-1": {
    plain: "WEP 很弱被淘汰，<strong>802.11i RSN + WPA/WPA2</strong> 才是正经无线安全方案。",
    memory: "演进：<strong>WEP 弱 → WPA → 802.11i RSN</strong>。"
  },
  "7-2": {
    plain: "SMTP 负责<strong>送信</strong>，POP3/IMAP 负责<strong>收信</strong>；SMTP 传，访问协议取。",
    memory: "SMTP=<strong>发送</strong>；POP3/IMAP=<strong>收取</strong>。"
  },
  "7-3": {
    plain: "S/MIME 数字信封：随机 AES 密钥加密正文，再用<strong>接收方公钥加密 AES 密钥</strong>，比纯 RSA 加密整封信高效。",
    memory: "S/MIME：<strong>AES 加密内容 + RSA 加密密钥</strong>，混合加密。"
  },
  "7-4": {
    plain: "DKIM 用<strong>域名私钥签整封邮件</strong>（含头），比 S/MIME 只签正文更能防伪造来源。",
    memory: "DKIM vs S/MIME：DKIM 签<strong>内容+RFC5322 头</strong>，域级认证。"
  },
  "8-1": {
    plain: "IPSec 在 <strong>IP 层</strong>加密，不管上层应用有没有自己的安全，整网流量都能保护。",
    memory: "IPSec = <strong>网络层安全</strong>，IPv4/IPv6 均可用。"
  },
  "8-2": {
    plain: "传输模式只保护<strong>IP 载荷</strong>；隧道模式再套一层<strong>新 IP 头</strong>，适合站点到站点 VPN。",
    memory: "传输=<strong>保护载荷</strong>；隧道=<strong>再封装外网 IP 头</strong>。"
  },
  "8-3": {
    plain: "SA 是<strong>单向安全通道约定</strong>，策略在 SPD，具体参数在 SAD。",
    memory: "SA 单向；<strong>SPD 策略 + SAD 关联</strong>。"
  },
  "9-1": {
    plain: "DES 老标准 64 位块 56 位钥；AES 现代标准 <strong>128 位块，128/192/256 位钥</strong>。",
    memory: "DES：<strong>64/56/64</strong>；AES：<strong>128/128·192·256/128</strong>。"
  },
  "9-2": {
    plain: "RC4 先<strong>KSA 洗牌 S 盒</strong>，再逐字节异或生成密钥流；同一密钥流加密两次会泄露明文关系。",
    memory: "RC4：<strong>KSA 初始化 + PRGA 异或</strong>；切勿<strong>密钥流重用</strong>。"
  },
  "9-3": {
    plain: "哈希函数把任意长消息<strong>压缩成固定长度指纹</strong>，单向、抗碰撞。",
    memory: "Hash：<strong>任意长→固定长</strong>，h = H(M)。"
  },
  "9-4": {
    plain: "RSA 安全靠<strong>大整数分解难</strong>；知道 φ(n) 和 e 就能求 d，加密 c=m<sup>e</sup> mod n。",
    memory: "RSA 难基：<strong>大数分解</strong>；ed ≡ 1 (mod φ(n))。"
  }
};
