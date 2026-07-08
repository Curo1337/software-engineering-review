/* 密码学例题解析 */
const EXAMPLE_DATA = {
  ch4: [
    {
      id: "ex-4-1",
      title: "【例题】RSA 密钥生成与加解密（完整步骤）",
      tags: ["例题", "计算题"],
      stem: `<p>设 p = 3，q = 11，取 e = 7。求公钥和私钥，并计算明文 m = 5 的密文 c，再验证解密正确。</p>`,
      solution: `
        <h4>Step 1：计算 n 和 φ(n)</h4>
        <p>n = p × q = 3 × 11 = <strong>33</strong></p>
        <p>φ(n) = (p−1)(q−1) = 2 × 10 = <strong>20</strong></p>
        <h4>Step 2：验证 e 合法</h4>
        <p>gcd(7, 20) = 1 ✓（e 与 φ(n) 互素才能求 d）</p>
        <h4>Step 3：求私钥 d</h4>
        <p>求 d 使得 7d ≡ 1 (mod 20)</p>
        <p>试算：7×3 = 21 ≡ 1 (mod 20) → <strong>d = 3</strong></p>
        <table class="compare-table">
          <tr><th>密钥</th><th>值</th><th>谁持有</th></tr>
          <tr><td>公钥 (n, e)</td><td><strong>(33, 7)</strong></td><td>公开</td></tr>
          <tr><td>私钥 (n, d)</td><td><strong>(33, 3)</strong></td><td>保密</td></tr>
        </table>
        <h4>Step 4：加密 m = 5（平方-乘算法求 5⁷ mod 33）</h4>
        <p>7 的二进制 = 111₂ = 4 + 2 + 1</p>
        <div class="example-box"><pre>
5¹ mod 33 = 5
5² mod 33 = 25
5⁴ mod 33 = 25² mod 33 = 625 mod 33 = 16

5⁷ = 5⁴ × 5² × 5¹
   = 16 × 25 × 5 mod 33
   = 400 × 5 mod 33
   = 2000 mod 33 = 14

∴ 密文 c = 14
        </pre></div>
        <h4>Step 5：解密验证 c = 14</h4>
        <div class="example-box"><pre>
m = c^d mod n = 14³ mod 33

14¹ = 14
14² = 196 mod 33 = 31
14³ = 14² × 14 = 31 × 14 = 434 mod 33 = 5  ✓

解密得到 m = 5，与原文一致
        </pre></div>
        <div class="tip-box"><strong>考试技巧：</strong>模幂运算一律用<strong>平方-乘</strong>，把指数写成 2 的幂之和，逐步算 mod n，避免数字爆炸。</div>
      `
    },
    {
      id: "ex-4-2",
      title: "【例题】扩展欧几里得求 RSA 私钥 d",
      tags: ["例题", "计算题"],
      stem: `<p>已知 p = 7，q = 13，e = 5。求 φ(n) 和私钥 d，使 e·d ≡ 1 (mod φ(n))。</p>`,
      solution: `
        <h4>Step 1：基础量</h4>
        <p>n = 7 × 13 = <strong>91</strong></p>
        <p>φ(n) = 6 × 12 = <strong>72</strong></p>
        <h4>Step 2：扩展欧几里得求 5d ≡ 1 (mod 72)</h4>
        <div class="example-box"><pre>
72 = 14 × 5 + 2       ……①
 5 =  2 × 2 + 1       ……②

由②：1 = 5 − 2×2
代入①中 2 = 72 − 14×5：
1 = 5 − 2×(72 − 14×5)
  = 5 − 2×72 + 28×5
  = 29×5 − 2×72

即 29×5 ≡ 1 (mod 72)  →  d = 29
        </pre></div>
        <h4>Step 3：验证</h4>
        <p>5 × 29 = 145 = 72 × 2 + 1 ≡ 1 (mod 72) ✓</p>
        <table class="compare-table">
          <tr><th>密钥</th><th>值</th></tr>
          <tr><td>公钥 (n, e)</td><td><strong>(91, 5)</strong></td></tr>
          <tr><td>私钥 (n, d)</td><td><strong>(91, 29)</strong></td></tr>
        </table>
        <div class="tip-box"><strong>考试技巧：</strong>求出 d 后务必回代验证 e×d mod φ(n) = 1，避免扩展欧几里得计算失误。</div>
      `
    }
  ],
  ch5: [
    {
      id: "ex-5-1",
      title: "【例题】MAC 工作过程理解题",
      tags: ["例题", "简答"],
      stem: `<p>A 和 B 共享密钥 k。A 发送消息 m = "Transfer100" 并附带 MAC = C(k, m) = 0xA3F2。B 收到后应如何验证？若攻击者把消息改成 "Transfer900" 但 MAC 不变，B 能发现吗？</p>`,
      solution: `
        <h4>B 的验证步骤</h4>
        <ol>
          <li>从报文中分离消息 m' 和收到的 MAC<sub>收</sub></li>
          <li>用共享密钥 k 计算 MAC<sub>算</sub> = C(k, m')</li>
          <li>比较 MAC<sub>算</sub> 与 MAC<sub>收</sub> 是否相等</li>
        </ol>
        <h4>攻击场景分析</h4>
        <div class="example-box"><pre>
原始:  m = "Transfer100"   MAC = C(k,m) = 0xA3F2  ✓ 通过

篡改:  m' = "Transfer900"  MAC 仍为 0xA3F2
       B 计算 C(k, "Transfer900") = 0x7B1C ≠ 0xA3F2  ✗ 拒绝

→ MAC 绑定了消息内容，改内容必导致 MAC 不匹配
        </pre></div>
        <div class="tip-box"><strong>注意：</strong>MAC 不提供保密——"Transfer100" 明文可被窃听。若要保密，需再对 m‖MAC 整体加密传输。</div>
      `
    }
  ],
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
        <div class="example-box"><pre>
A 用私钥签名：sig = Sign(sk_A, m)
A 用 B 的公钥加密：c = Enc(pk_B, m || sig)
B 用私钥解密 → 得到 m 和 sig → 用 A 公钥验签
        </pre></div>
        <div class="tip-box"><strong>记忆：</strong>签名针对<strong>明文</strong>，加密保护<strong>传输保密</strong>。顺序 = 签名 → 加密。</div>
      `
    },
    {
      id: "ex-6-2",
      title: "【例题】RSA 数字签名与验证",
      tags: ["例题", "计算题"],
      stem: `<p>沿用 RSA 参数：p=3, q=11, e=7, d=3, n=33。消息 M 的哈希值 H(M)=6。请计算签名 S，并说明接收方如何验证。</p>`,
      solution: `
        <h4>Step 1：理解 RSA 签名与加密的区别</h4>
        <div class="example-box"><pre>
加密: c = m^e mod n  （公钥 e 加密）
签名: S = h^d mod n  （私钥 d 签名）← 注意用 d 不是 e
验签: h = S^e mod n  （公钥 e 验证）
        </pre></div>
        <h4>Step 2：计算签名 S</h4>
        <p>S = H(M)<sup>d</sup> mod n = 6<sup>3</sup> mod 33</p>
        <div class="example-box"><pre>
6² = 36 mod 33 = 3
6³ = 6² × 6 = 3 × 6 = 18 mod 33

签名 S = 18
        </pre></div>
        <h4>Step 3：接收方验证</h4>
        <ol>
          <li>对收到的消息 M 计算 h' = H(M) = 6</li>
          <li>用发送方公钥验证：S<sup>e</sup> mod n = 18<sup>7</sup> mod 33</li>
        </ol>
        <div class="example-box"><pre>
18² mod 33 = 324 mod 33 = 27
18⁴ mod 33 = 27² mod 33 = 729 mod 33 = 3
18⁷ = 18⁴ × 18² × 18 = 3 × 27 × 18 mod 33
    = 81 × 18 = 1458 mod 33 = 6  ✓

6 = h' → 签名有效，消息未被篡改且来自私钥持有者
        </pre></div>
        <div class="tip-box"><strong>易错点：</strong>签名用<strong>私钥 d</strong>，验签用<strong>公钥 e</strong>，与加密方向相反！</div>
      `
    },
    {
      id: "ex-6-3",
      title: "【例题】ElGamal 数字签名完整计算",
      tags: ["例题", "计算题"],
      stem: `<p>ElGamal 签名参数：p=19, g=2, 私钥 x=5, 公钥 y=g<sup>x</sup> mod p。消息哈希 H(M)=15，选随机数 k=5。求签名 (r,s) 并验证。</p>`,
      solution: `
        <h4>Step 1：求公钥 y</h4>
        <p>y = 2<sup>5</sup> mod 19 = 32 mod 19 = <strong>13</strong></p>
        <h4>Step 2：检查 k 合法</h4>
        <p>gcd(k, p−1) = gcd(5, 18) = 1 ✓（必须互素才能求 k<sup>−1</sup>）</p>
        <h4>Step 3：计算 r</h4>
        <p>r = g<sup>k</sup> mod p = 2<sup>5</sup> mod 19 = <strong>13</strong></p>
        <h4>Step 4：计算 s</h4>
        <p>s = k<sup>−1</sup>(H(M) − x·r) mod (p−1)</p>
        <div class="example-box"><pre>
k⁻¹ mod 18：5 × 11 = 55 ≡ 1 (mod 18)  →  k⁻¹ = 11

H(M) − x·r = 15 − 5×13 = 15 − 65 = −50
−50 mod 18 = −50 + 3×18 = 4

s = 11 × 4 mod 18 = 44 mod 18 = 8
        </pre></div>
        <p>签名 <strong>(r, s) = (13, 8)</strong></p>
        <h4>Step 5：验证 g^H(M) ≡ y^r · r^s (mod p)</h4>
        <div class="example-box"><pre>
左边：g^H(M) mod 19 = 2^15 mod 19
  2⁴=16, 2⁸=256 mod 19=9, 2¹⁵=2⁸×2⁴×2²×2=9×16×4×2=1152 mod 19=12

右边：y^r · r^s mod 19 = 13^13 · 13^8 mod 19
  （13 ≡ −6 mod 19，可简化计算）
  最终 = 12 mod 19

12 = 12  ✓  验证通过
        </pre></div>
        <div class="warn-box">⚠️ 每次签名必须选不同的随机 k；若 k 泄露，攻击者可求出私钥 x = (H(M)−s·k)·r⁻¹ mod (p−1)。</div>
      `
    }
  ]
};
