/* 网络安全例题解析 */
const EXAMPLE_DATA = {
  ch3: [
    {
      id: "ex-3-1",
      title: "【例题】压缩病毒 CV 的隐身原理",
      tags: ["例题", "简答"],
      stem: `<p>说明压缩病毒 CV 如何在感染后保持文件大小几乎不变，从而逃避检测。</p>`,
      solution: `
        <h4>核心思路</h4>
        <div class="example-box"><pre>
原始文件 100KB
  ↓ 压缩宿主
压缩后 50KB
  ↓ 附加病毒代码 50KB
感染后 50KB + 50KB = 100KB  ← 与原始大小几乎相同
        </pre></div>
        <p>若直接附加病毒而不压缩，文件会明显增大（100KB → 150KB），容易被发现。</p>
        <div class="tip-box"><strong>答题要点：</strong>写清「<strong>压缩宿主 + 病毒体积抵消</strong>」和「<strong>感染前后长度相同</strong>」两句。</div>
      `
    }
  ],
  ch5: [
    {
      id: "ex-5-1",
      title: "【例题】Kerberos V4 三轮认证交换",
      tags: ["例题", "流程题"],
      stem: `<p>简述客户端 C 访问服务器 V 时，Kerberos V4 的 (a)(b)(c) 三轮交换各做什么。</p>`,
      solution: `
        <h4>(a) 向 AS 获取 TGT</h4>
        <p>C → AS：ID<sub>c</sub> || ID<sub>tgs</sub> || TS<sub>1</sub></p>
        <p>AS → C：E(K<sub>c</sub>, [K<sub>c,tgs</sub> || … || Ticket<sub>tgs</sub>])</p>
        <h4>(b) 向 TGS 获取服务票据</h4>
        <p>C → TGS：ID<sub>v</sub> || Ticket<sub>tgs</sub> || Authenticator<sub>c</sub></p>
        <p>TGS → C：E(K<sub>c,tgs</sub>, [K<sub>c,v</sub> || … || Ticket<sub>v</sub>])</p>
        <h4>(c) 向服务 V 认证</h4>
        <p>C → V：Ticket<sub>v</sub> || Authenticator<sub>c</sub></p>
        <p>V → C（可选双向）：E(K<sub>c,v</sub>, [TS<sub>5</sub>+1])</p>
        <div class="tip-box"><strong>记忆：</strong>AS 发票据授权票 TGT → TGS 换服务票 → 服务方验票办事。</div>
      `
    }
  ],
  ch7: [
    {
      id: "ex-7-1",
      title: "【例题】S/MIME 数字信封加解密流程",
      tags: ["例题", "流程题"],
      stem: `<p>邮件发送者 B 将明文 M 用 RSA+AES 混合加密发给 A，描述 B 加密与 A 解密的步骤，并说明相比纯 RSA 加密的特色。</p>`,
      solution: `
        <h4>B 加密（发送）</h4>
        <ol>
          <li>生成随机 128 位 AES 密钥 k（仅用于本消息）</li>
          <li>用 k 对消息 M 做 AES 对称加密得密文</li>
          <li>用接收方 A 的 RSA <strong>公钥</strong>加密 k，附在邮件中</li>
          <li>发送（密文 + 加密的 k）</li>
        </ol>
        <h4>A 解密（接收）</h4>
        <ol>
          <li>用 RSA <strong>私钥</strong>解密恢复 k</li>
          <li>用 k 对密文做 AES 解密得明文 M</li>
        </ol>
        <h4>特色</h4>
        <ul>
          <li><strong>混合加密</strong>：长消息用 AES（快），短密钥用 RSA（安全传密钥）</li>
          <li>比纯 RSA 加密整封邮件<strong>效率高得多</strong></li>
        </ul>
      `
    }
  ],
  ch9: [
    {
      id: "ex-9-1",
      title: "【例题】RC4 密钥流重用攻击分析",
      tags: ["例题", "分析题"],
      stem: `<p>Alice 与 Bob 用固定 128 位密钥 k，每次选 80 位随机数 v，发送 c = RC4(v||k) ⊕ m。攻击者观察到 (v₁||c₁)、(v₂||c₂)… 如何判断两次加密是否用了相同密钥流？能否修补？</p>`,
      solution: `
        <h4>(1) 如何判断密钥流重用</h4>
        <p>若 v₁ = v₂，则 RC4(v₁||k) = RC4(v₂||k)，两次密钥流相同。</p>
        <div class="example-box"><pre>
c₁ = m₁ ⊕ KS
c₂ = m₂ ⊕ KS   （KS 相同）

c₁ ⊕ c₂ = m₁ ⊕ m₂
        </pre></div>
        <p>攻击者对两密文异或，<strong>密钥流被消掉</strong>，若结果不像随机噪声而有结构，说明 v 重复或密钥流重用。</p>
        <h4>(2) 修补方法</h4>
        <ul>
          <li><strong>每次使用新的随机 v</strong>，并保证 v 空间足够大、真随机</li>
          <li>更好：<strong>每条消息换新密钥</strong>，或 v 后加递增计数器/时间戳</li>
          <li>现代实践：弃用 RC4，改用 AES-GCM 等 AEAD 方案</li>
        </ul>
      `
    },
    {
      id: "ex-9-2",
      title: "【例题】RSA 加解密计算（n=35）",
      tags: ["例题", "计算题"],
      stem: `<p>已知 n = 35，e = 3，密文 C = 10。求私钥 d 并解密得明文 M。</p>`,
      solution: `
        <h4>Step 1：分解 n 求 φ(n)</h4>
        <p>n = 35 = 5 × 7</p>
        <p>φ(n) = (5−1)(7−1) = <strong>24</strong></p>
        <h4>Step 2：求 d</h4>
        <p>3d ≡ 1 (mod 24) → <strong>d = 5</strong></p>
        <h4>Step 3：解密</h4>
        <p>M = C<sup>d</sup> mod n = 10<sup>5</sup> mod 35 = <strong>5</strong></p>
        <h4>验证</h4>
        <p>C = M<sup>e</sup> mod n = 5³ mod 35 = 125 mod 35 = 10 ✓</p>
      `
    }
  ]
};
