/* 密码学例题解析 */
const EXAMPLE_DATA = {
  ch6: [
    {
      id: "ex-6-1",
      title: "【例题】先签名后加密还是先加密后签名？",
      tags: ["例题", "简答"],
      stem: `<p>如果用户 A 想对消息 m 进行签名并秘密地将 m 发送给用户 B，请问 A 是<strong>先签名后加密</strong>好还是<strong>先加密后签名</strong>好？请说明理由。</p>`,
      solution: `
        <h4>答案：最好先签名（对明文签名），再加密</h4>
        <h4>理由一：可存储复用</h4>
        <p>先对明文 m 签名得到 sig，签名结果可以<strong>存储起来</strong>，需要时可向第三方出示作为证据（不可否认性）。若先加密后签名，签名绑定的是密文，无法独立验证原始消息。</p>
        <h4>理由二：避免安全威胁</h4>
        <p>若<strong>先加密后签名</strong>，攻击者可能截获 (c, sig)，保留 sig 而替换 c，或将自己的消息加密后附上他人签名，导致验证流程出现漏洞（取决于具体实现）。</p>
        <h4>推荐流程</h4>
        <div class="example-box">
          A 用私钥签名：sig = Sign(sk_A, m)<br>
          A 用 B 的公钥加密：c = Enc(pk_B, m || sig)<br>
          B 解密后验证签名
        </div>
        <div class="tip-box"><strong>记忆：</strong>签名针对<strong>明文</strong>，加密保护<strong>传输保密</strong>。顺序 = 签名 → 加密。</div>
      `
    }
  ],
  ch4: [
    {
      id: "ex-4-1",
      title: "【例题】RSA 密钥生成与加解密",
      tags: ["例题", "计算题"],
      stem: `<p>设 p = 3，q = 11，取 e = 7。求公钥和私钥，并计算明文 m = 5 的密文 c。</p>`,
      solution: `
        <h4>Step 1：计算 n 和 φ(n)</h4>
        <p>n = p × q = 3 × 11 = <strong>33</strong></p>
        <p>φ(n) = (p−1)(q−1) = 2 × 10 = <strong>20</strong></p>
        <h4>Step 2：验证 e</h4>
        <p>gcd(7, 20) = 1 ✓，e = 7 合法</p>
        <h4>Step 3：求 d</h4>
        <p>7d ≡ 1 (mod 20) → d = <strong>3</strong>（因为 7×3 = 21 ≡ 1 mod 20）</p>
        <p>公钥：(n, e) = <strong>(33, 7)</strong>；私钥：(n, d) = <strong>(33, 3)</strong></p>
        <h4>Step 4：加密 m = 5</h4>
        <p>c = m<sup>e</sup> mod n = 5<sup>7</sup> mod 33</p>
        <p>5<sup>2</sup> = 25，5<sup>4</sup> = 625 mod 33 = 16，5<sup>7</sup> = 5<sup>4</sup>×5<sup>2</sup>×5 = 16×25×5 mod 33 = <strong>14</strong></p>
        <h4>Step 5：验证解密</h4>
        <p>m = c<sup>d</sup> mod n = 14<sup>3</sup> mod 33 = 2744 mod 33 = <strong>5</strong> ✓</p>
      `
    }
  ]
};
