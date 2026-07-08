/* 现代密码学总复习 - 详细解析数据 */
const REVIEW_DATA = [
  {
    id: "ch1",
    title: "第一章 绪论",
    questions: [
      {
        id: "1-1",
        title: "对称密码与非对称密码体制",
        tags: ["基础概念", "常考", "对比"],
        content: `
          <h4>对称密码（单钥密码 / 私钥密码）</h4>
          <p><strong>加密密钥与解密密钥相同</strong>，通信双方必须事先共享同一密钥。</p>
          <ul>
            <li><strong>分组密码</strong>：明文按固定长度分组后逐组加密（如 DES、AES）</li>
            <li><strong>流密码</strong>：逐比特或逐字节加密，密钥流与明文异或（如 RC4）</li>
          </ul>
          <h4>非对称密码体制（双钥密码 / 公钥密码）</h4>
          <p><strong>加密密钥与解密密钥不同</strong>，通常公钥加密、私钥解密，或私钥签名、公钥验证。</p>
          <ul>
            <li>典型代表：<strong>RSA</strong>、ElGamal、ECC 等</li>
            <li>解决密钥分配、数字签名等对称密码难以解决的问题</li>
          </ul>
          <table class="compare-table">
            <tr><th>对比项</th><th>对称密码</th><th>非对称密码</th></tr>
            <tr><td>密钥</td><td>加解密相同</td><td>公钥 / 私钥成对</td></tr>
            <tr><td>速度</td><td>快</td><td>慢</td></tr>
            <tr><td>密钥管理</td><td>困难（需安全通道分发）</td><td>公钥可公开</td></tr>
            <tr><td>典型用途</td><td>大量数据加密</td><td>密钥交换、数字签名</td></tr>
          </table>
          <h4>📊 工作流程对比</h4>
          <div class="example-box"><pre>
对称密码（Alice → Bob，共享密钥 K）
  Alice:  明文 m ──E(K)──→ 密文 c ──发送──→ Bob
  Bob:    密文 c ──D(K)──→ 明文 m
          ↑ 双方必须事先安全地共享同一密钥 K

非对称密码（Bob 的公钥加密）
  Bob 公开 pk，保密 sk
  Alice:  明文 m ──E(pk)──→ 密文 c ──发送──→ Bob
  Bob:    密文 c ──D(sk)──→ 明文 m
          ↑ 只有 Bob 的私钥 sk 能解密
          </pre></div>
        `
      },
      {
        id: "1-2",
        title: "好的密码体制应满足的两个条件",
        tags: ["重点", "简答"],
        content: `
          <ol>
            <li><strong>已知明文 m 和加密密钥 k 时</strong>，计算密文 c = E<sub>k</sub>(m) <strong>容易</strong>；<strong>已知密文 c 和解密密钥 k 时</strong>，计算明文 m = D<sub>k</sub>(c) <strong>容易</strong>（合法用户高效加解密）</li>
            <li><strong>在不知解密密钥 k 时</strong>，由密文 c <strong>不可能</strong>（计算上不可行）恢复出明文 m（攻击者无法破译）</li>
          </ol>
          <div class="tip-box"><strong>💡 考点：</strong>第 1 条保证<strong>可用性</strong>，第 2 条保证<strong>安全性</strong>。考试常考「计算上不可行」这一表述。</div>
        `
      },
      {
        id: "1-3",
        title: "密码分析者的三种攻击方法及对抗措施",
        tags: ["重点", "简答"],
        content: `
          <table class="compare-table">
            <tr><th>攻击方法</th><th>原理</th><th>对抗措施</th></tr>
            <tr>
              <td>① 穷举攻击</td>
              <td>试遍所有可能的密钥进行破译</td>
              <td><strong>增大密钥空间</strong>（密钥数量足够多，使穷举在计算上不可行）</td>
            </tr>
            <tr>
              <td>② 统计分析攻击</td>
              <td>分析密文和明文的<strong>统计规律</strong>来破译</td>
              <td><strong>使明文和密文的统计规律不一样</strong>（混淆、扩散）</td>
            </tr>
            <tr>
              <td>③ 解密变换攻击</td>
              <td>针对加密变换的<strong>数学基础</strong>，通过数学求解找到解密变换</td>
              <td>选用具有<strong>坚实数学基础</strong>且<strong>足够复杂</strong>的加密算法</td>
            </tr>
          </table>
        `
      },
      {
        id: "1-4",
        title: "古典密码：置换密码与代替密码",
        tags: ["基础", "填空"],
        content: `
          <h4>置换密码（易位密码）</h4>
          <p>明文中的字或字母<strong>重新排列</strong>，字符本身不变，<strong>位置改变</strong>形成密文。</p>
          <ul>
            <li>最简单的易位密码：<strong>报文倒置法</strong>——按字顺序依次倒置，截成固定长度字母组</li>
          </ul>
          <h4>代替密码（代换密码）</h4>
          <p>把明文中的每一个字符<strong>替换成</strong>密文字母表中的另一个字符，使用密钥 K 运算得到密文；接收者逆运算恢复明文。</p>
          <ul>
            <li><strong>单表代替密码</strong>：整个明文使用同一张替换表</li>
            <li><strong>多表代换密码</strong>：不同位置使用不同替换表（如 Vigenère 密码），安全性更高</li>
          </ul>
          <h4>📊 图解：置换 vs 代替</h4>
          <div class="example-box"><pre>
明文:  H E L L O

【置换密码】字母不变，位置打乱（易位）
密文:  L L E O H     ← 重新排列

【单表代替】字母替换，位置不变
明文:  H E L L O
         ↓ ↓ ↓ ↓ ↓  （按密钥 K 映射）
密文:  K H O O R     ← 每个字母换成另一个

【多表代替】不同位置用不同替换表
第1位用表1，第2位用表2… 比单表更难被统计分析攻破
          </pre></div>
        `
      },
      {
        id: "1-5",
        title: "密码的分类（五种划分方式）",
        tags: ["常考", "填空"],
        content: `
          <table class="compare-table">
            <tr><th>划分依据</th><th>类型</th></tr>
            <tr><td>历史发展阶段与应用技术</td><td>手工密码、机械密码、电子机内乱密码、计算机密码</td></tr>
            <tr><td>密码转换的操作类型</td><td><strong>替代密码</strong>、<strong>移位密码</strong></td></tr>
            <tr><td>保密程度</td><td>理论上保密、实际上保密、不保密</td></tr>
            <tr><td>明文加密时的处理方法</td><td><strong>分组密码</strong>、<strong>序列密码</strong>（流密码）</td></tr>
            <tr><td>密钥的类型</td><td><strong>对称密钥密码</strong>、<strong>非对称密钥密码</strong></td></tr>
          </table>
          <div class="tip-box"><strong>记忆口诀：</strong>按操作分「替移」，按处理分「分流」，按密钥分「对称 / 非对称」。</div>
        `
      }
    ]
  },
  {
    id: "ch2",
    title: "第二章 流密码",
    questions: [
      {
        id: "2-1",
        title: "流密码的基本概念与特点",
        tags: ["基础概念"],
        content: `
          <p><strong>流密码</strong>（序列密码）将明文按<strong>比特或字节</strong>逐位加密，通常用密钥流发生器产生与明文等长的密钥流，再与明文做异或运算得到密文。</p>
          <h4>📊 流密码工作原理</h4>
          <div class="example-box"><pre>
密钥 K → [密钥流发生器] → z₁ z₂ z₃ z₄ …（密钥流）
明文   m₁ m₂ m₃ m₄ …
         ⊕  ⊕  ⊕  ⊕   （逐位异或）
密文   c₁ c₂ c₃ c₄ …

特点：来一位处理一位，延迟低，适合实时通信（如 GSM、WiFi）
          </pre></div>
          <h4>与分组密码的对比</h4>
          <table class="compare-table">
            <tr><th>对比项</th><th>流密码</th><th>分组密码</th></tr>
            <tr><td>加密单位</td><td>逐比特 / 逐字节</td><td>固定长度分组</td></tr>
            <tr><td>延迟</td><td>低，适合实时通信</td><td>需凑满一组再加密</td></tr>
            <tr><td>典型算法</td><td>RC4、A5/1</td><td>DES、AES</td></tr>
            <tr><td>错误传播</td><td>单比特错误只影响对应位</td><td>可能影响整个分组</td></tr>
          </table>
          <div class="warn-box">⚠️ 复习提纲中本章内容较少，重点掌握与分组密码的区别及对称密码框架下的位置即可。</div>
        `
      }
    ]
  },
  {
    id: "ch3",
    title: "第三章 分组密码",
    questions: [
      {
        id: "3-1",
        title: "分组密码基本的代换-置换结构",
        tags: ["基础", "常考"],
        content: `
          <p>现代分组密码多采用<strong>代换-置换网络（SP 网络）</strong>结构，通过多轮迭代实现加密：</p>
          <ol>
            <li><strong>代换（Substitution）</strong>：通过 S 盒等非线性变换，混淆明文与密文关系</li>
            <li><strong>置换（Permutation）</strong>：通过 P 盒等变换，扩散单个比特的影响范围</li>
            <li><strong>多轮迭代</strong>：重复「轮函数 + 子密钥混合」，增强安全性</li>
          </ol>
          <p>典型代表：<strong>DES</strong> 采用 Feistel 结构（可视为 SP 网络的变体），<strong>AES</strong> 采用代换-置换结构。</p>
          <h4>📊 Feistel 结构（DES 采用）</h4>
          <div class="example-box"><pre>
明文分组 (L₀, R₀)
    ┌──────────────────────────────────────┐
    │  第 i 轮                              │
    │  Lᵢ ─────────────────────→ ⊕ ─→ Lᵢ₊₁ │
    │           ↑                │         │
    │  Rᵢ ─→ F(·,Kᵢ) ─→─────────┘   → Rᵢ₊₁ │
    │         轮函数                      │
    └──────────────────────────────────────┘
    重复 n 轮 → 输出密文分组

关键：F 函数 + 子密钥 Kᵢ 多轮迭代，实现混淆与扩散
          </pre></div>
          <h4>📊 SP 网络（AES 采用）</h4>
          <div class="example-box"><pre>
明文 → [S盒代换] → [P盒置换] → ⊕子密钥 → … → 多轮 → 密文
         混淆         扩散

S 盒：非线性替换    P 盒：比特位置打乱，扩大影响范围
          </pre></div>
        `
      },
      {
        id: "3-2",
        title: "分组密码的设计准则（S 盒、P 盒、轮函数 F）",
        tags: ["重点", "简答"],
        content: `
          <p>分组密码的设计准则需要重点考虑：<strong>S 盒</strong>、<strong>P 盒</strong>、<strong>轮函数 F</strong>、<strong>迭代轮数</strong>、<strong>密钥扩展算法</strong>。</p>
          <h4>S-P 网络</h4>
          <p>是一个集<strong>掩蔽、混淆、扩散</strong>于一体的综合性部件，目的是实现高度的<strong>非线性化</strong>和良好的<strong>雪崩效应</strong>。</p>
          <h4>S 盒的设计</h4>
          <p>分组密码<strong>非线性部分的核心部件</strong>，起着加密算法的<strong>混淆作用</strong>，直接影响整个分组密码算法的<strong>安全强度</strong>。</p>
          <h4>P 盒的设计</h4>
          <p>P 盒多半继若干个 S 盒之后，设计准则是要实现良好的<strong>雪崩效应</strong>，进一步增加<strong>扩散程度</strong>。例如 DES 中要求 1 比特输入能引起大约一半输出位的快速变化响应。</p>
          <h4>迭代轮函数 F 的设计准则</h4>
          <p>轮函数 F 指迭代分组密码中单轮加密算法的非线性函数。设计准则：保证<strong>非线性度要强</strong>，通过<strong>位独立</strong>和<strong>雪崩效应</strong>实现更加混乱。</p>
          <table class="compare-table">
            <tr><th>指标</th><th>要求</th></tr>
            <tr><td>安全性</td><td>必须能抵抗所有已知密码攻击，尤其是<strong>差分密码分析</strong>和<strong>线性密码分析</strong></td></tr>
            <tr><td>速度</td><td>加密解密应足够快</td></tr>
            <tr><td>灵活性</td><td>支持在多平台和多处理器上实现</td></tr>
          </table>
        `
      },
      {
        id: "3-3",
        title: "迭代轮数与密钥扩展算法",
        tags: ["简答", "补充"],
        content: `
          <p>复习概要中与设计准则并列、但需单独掌握的两个要点：</p>
          <h4>迭代轮数</h4>
          <ul>
            <li>轮数越多，密码通常越安全（攻击者需破解更多轮的非线性变换）</li>
            <li>但轮数增加会降低加解密<strong>速度</strong></li>
            <li>需在<strong>安全性</strong>与<strong>效率</strong>之间权衡（如 DES 16 轮、AES 10/12/14 轮）</li>
          </ul>
          <h4>密钥扩展算法（Key Schedule）</h4>
          <p>将用户输入的<strong>主密钥</strong>扩展/generate 出各轮所需的<strong>子密钥</strong> K₁, K₂, …, K<sub>n</sub>。</p>
          <div class="example-box"><pre>
主密钥 K（如 128 bit）
        ↓
  [密钥扩展算法]
        ↓
子密钥: K₁  K₂  K₃  …  K₁₆  → 分别送入各轮轮函数

要求：子密钥之间关联不能太简单，否则主密钥易被反推
          </pre></div>
          <div class="tip-box"><strong>简答模板：</strong>迭代轮数影响安全与速度；密钥扩展算法负责从主密钥派生各轮子密钥，其设计影响整体安全强度。</div>
        `
      }
    ]
  },
  {
    id: "ch4",
    title: "第四章 公钥密码",
    questions: [
      {
        id: "4-1",
        title: "公钥密码体制的基本概念与提出背景",
        tags: ["重点", "简答"],
        content: `
          <p>公钥密码体制的概念是在解决单钥密码体制中最难解决的两个问题时提出的：</p>
          <ol>
            <li><strong>密钥分配</strong>：如何安全地分发共享密钥</li>
            <li><strong>数字签字</strong>：如何为数字化消息提供类似手书签字的认证</li>
          </ol>
          <h4>对密钥分配的要求</h4>
          <ul>
            <li>常可用<strong>人工方式</strong>传送双方最初共享的密钥，但成本很高，且完全依赖信使的可靠性</li>
            <li>大规模应用则完全依赖<strong>密钥分配中心（KDC）</strong>的可靠性</li>
          </ul>
          <h4>对数字签字的要求</h4>
          <p>考虑如何为数字化的消息或文件提供一种类似于为书面文件<strong>手书签字</strong>的方法。</p>
          <div class="tip-box"><strong>💡 核心思想：</strong>公钥可以公开，私钥保密；用公钥加密的数据只有私钥能解，用私钥签名的数据可用公钥验证。</div>
        `
      },
      {
        id: "4-2",
        title: "认证符与数字签字的改进方法",
        tags: ["简答"],
        content: `
          <p>用户数目很多时，认证方法需要很大存储空间：每个文件须<strong>明文存储</strong>以便使用，同时须存储<strong>加密后的数字签字</strong>以便争议时认证来源和内容。</p>
          <h4>改进方法</h4>
          <p><strong>减小数字签字的大小</strong>：将文件经过函数压缩成长度较小的比特串，该比特串称为<strong>认证符</strong>。</p>
          <h4>认证符的性质</h4>
          <ul>
            <li>如果保持认证符的值不变而修改文件，在<strong>计算上不可行</strong></li>
            <li>用发送者的<strong>秘密钥</strong>对认证符加密，加密后的结果为原文件的<strong>数字签字</strong></li>
          </ul>
          <h4>认证过程中的问题</h4>
          <ul>
            <li>消息由用户自己的<strong>秘密钥</strong>加密 → 消息<strong>不能被他人篡改</strong>，但<strong>能被他人窃听</strong>（任何人都能用公开钥解密）</li>
            <li>为同时提供<strong>认证</strong>和<strong>保密性</strong>，可使用<strong>双重加、解密</strong></li>
          </ul>
          <h4>📊 双重加解密流程</h4>
          <div class="example-box"><pre>
发送方 A                                    接收方 B
  明文 m
    ↓
  用 A 的私钥签名 → sig        （认证：证明是 A 发的）
    ↓
  用 B 的公钥加密 → c          （保密：只有 B 能解密）
    ↓
  发送 c ──────────────────────→  用 B 的私钥解密 → m + sig
                                      用 A 的公钥验签 → 确认来源

若只用私钥加密（签名）：可认证但任何人都能用公钥"解密"看到内容
双重操作 = 先认证 + 后保密
          </pre></div>
        `
      },
      {
        id: "4-3",
        title: "RSA 算法",
        tags: ["重点", "计算题"],
        content: `
          <h4>RSA 算法基本步骤</h4>
          <ol>
            <li>选两个大素数 p、q，计算 n = p × q，φ(n) = (p−1)(q−1)</li>
            <li>选公钥指数 e，满足 1 &lt; e &lt; φ(n) 且 gcd(e, φ(n)) = 1</li>
            <li>计算私钥指数 d，满足 e × d ≡ 1 (mod φ(n))</li>
            <li><strong>公钥</strong>：(n, e)；<strong>私钥</strong>：(n, d)</li>
            <li>加密：c = m<sup>e</sup> mod n；解密：m = c<sup>d</sup> mod n</li>
          </ol>
          <h4>📊 RSA 密钥关系图</h4>
          <div class="example-box"><pre>
        p, q（大素数，保密）
              ↓
    n = p×q（公开）    φ(n) = (p-1)(q-1)（保密）
              ↓
    选 e：gcd(e, φ)=1  →  求 d：e×d ≡ 1 (mod φ)
              ↓                    ↓
    公钥 (n, e) 公开        私钥 (n, d) 保密

加密/验签用 e    解密/签名用 d
          </pre></div>
          <h4>模幂运算：平方-乘算法</h4>
          <p>计算 a<sup>b</sup> mod n 时，将 b 写成二进制，逐位平方并累乘，避免直接算大幂次。</p>
          <div class="example-box"><pre>
例：5⁷ mod 33，7 = 111₂ = 4+2+1
  5¹=5,  5²=25,  5⁴=25² mod 33 = 625 mod 33 = 16
  5⁷ = 5⁴ × 5² × 5¹ = 16 × 25 × 5 mod 33 = 14
          </pre></div>
          <h4>安全性基础</h4>
          <p>基于<strong>大整数分解困难性</strong>：已知 n 难以分解出 p、q，从而难以求出 φ(n) 和 d。</p>
          <div class="warn-box">⚠️ 考试计算题注意：模幂运算可用平方-乘算法；选 e 常取 65537 或 3。</div>
        `
      }
    ]
  },
  {
    id: "ch5",
    title: "第五章 消息认证和哈希函数",
    questions: [
      {
        id: "5-1",
        title: "消息认证的概念与要求",
        tags: ["基础", "简答"],
        content: `
          <p><strong>认证</strong>：消息的接收者对消息进行的验证。</p>
          <h4>两个核心要求</h4>
          <ul>
            <li><strong>真实性</strong>：消息确实来自其真正的发送者，而非假冒</li>
            <li><strong>完整性</strong>：消息的内容没有被篡改</li>
          </ul>
          <p>是一个证实收到的消息来自<strong>可信的源点</strong>且<strong>未被篡改</strong>的过程，也可验证消息的<strong>顺序</strong>和<strong>及时性</strong>。</p>
          <h4>认证函数的三类</h4>
          <table class="compare-table">
            <tr><th>类型</th><th>说明</th></tr>
            <tr><td>消息加密函数</td><td>用完整信息的<strong>密文</strong>作为对信息的认证</td></tr>
            <tr><td>消息认证码 MAC</td><td>对信源消息的一个<strong>编码函数</strong>，使用密钥</td></tr>
            <tr><td>散列函数 Hash</td><td>公开函数，将任意长信息映射成<strong>固定长度</strong>的信息</td></tr>
          </table>
          <h4>认证函数的三个层次（复习概要补充）</h4>
          <table class="compare-table">
            <tr><th>层次</th><th>含义</th></tr>
            <tr><td>认证标识</td><td>Authentication Identification — 产生一个标识信息真实性的标记</td></tr>
            <tr><td>认证协议</td><td>Authentication Protocol — 规定双方如何交换消息、完成认证</td></tr>
            <tr><td>消息认证</td><td>Authentication — 接收者执行验证，确认消息真实且完整</td></tr>
          </table>
        `
      },
      {
        id: "5-2",
        title: "消息认证码 MAC",
        tags: ["重点", "常考"],
        content: `
          <p>使用密钥产生短小的定长数据分组，即<strong>密码校验 MAC</strong>，附加在报文中。</p>
          <h4>📊 MAC 工作流程</h4>
          <div class="example-box"><pre>
发送方 A                          接收方 B
  消息 m                            消息 m
    ↓                                 ↓
MAC=C(k,m) ──附在报文后──→ 发送 m‖MAC ──→ 重算 MAC'=C(k,m)
                                              ↓
                                         MAC' = MAC ?
                                         是 → 未篡改 + 来自共享密钥持有者
          </pre></div>
          <h4>工作流程（文字版）</h4>
          <ol>
            <li>通信双方共享密钥 k</li>
            <li>发送方计算 MAC = C(k, m) 并附在报文后</li>
            <li>接收方根据 m 重新计算 MAC，与接收到的 MAC 比较</li>
            <li>若密钥不公开且 MAC 匹配 → 报文未被更改，且来自声称的发送者</li>
          </ol>
          <h4>MAC 的特点</h4>
          <ul>
            <li>MAC 函数<strong>类似加密，但非加密，也无需可逆</strong></li>
            <li>报文鉴别<strong>不提供保密</strong>（常将 MAC 与明文并置后一起加密传输）</li>
            <li>MAC 是一种<strong>密码校验和</strong>：MAC = C(k, m)，用于对可变长消息 m 编写摘要</li>
            <li>MAC 是<strong>多对一</strong>映射：多个消息可能具有相同 MAC，但根据指定 MAC 构造消息很难</li>
          </ul>
          <h4>对 MAC 的要求</h4>
          <ol>
            <li>已知消息和 MAC 值，构造另一个具有相同 MAC 值的消息在计算上<strong>不可行</strong></li>
            <li>MAC 值应当<strong>均匀分布</strong>，抗基于选择明文的穷举攻击</li>
            <li>MAC 函数应当<strong>等概地使用</strong>消息的所有比特位</li>
          </ol>
        `
      },
      {
        id: "5-3",
        title: "Hash 函数（哈希函数 / 摘要函数）",
        tags: ["重点", "简答"],
        content: `
          <ul>
            <li><strong>输入</strong>：任意长度的消息报文 M</li>
            <li><strong>输出</strong>：固定长度的散列码值 H(M)</li>
            <li>是报文中所有比特的函数值，属于<strong>单向函数</strong></li>
          </ul>
          <h4>根据是否使用密钥</h4>
          <table class="compare-table">
            <tr><th>类型</th><th>说明</th><th>输出名称</th></tr>
            <tr><td>带秘密密钥的 Hash</td><td>哈希值由双方知道的秘密密钥 K 控制</td><td><strong>MAC</strong></td></tr>
            <tr><td>不带秘密密钥的 Hash</td><td>产生哈希值无需使用密钥</td><td><strong>MDC</strong>（修改检测码）</td></tr>
          </table>
          <h4>哈希函数的原理和作用</h4>
          <ul>
            <li><strong>单向性</strong>：从哈希值很难逆推出原始数据</li>
            <li><strong>确定性</strong>：相同输入总是产生相同输出</li>
            <li><strong>快速计算</strong>：适合大量数据快速处理</li>
            <li><strong>抗碰撞性</strong>：不同输入产生相同输出的可能性极低</li>
            <li><strong>固定长度</strong>：输出哈希值长度固定</li>
          </ul>
        `
      },
      {
        id: "5-4",
        title: "哈希函数应满足的条件",
        tags: ["填空", "简答"],
        content: `
          <ol>
            <li>函数的输入可以是<strong>任意长</strong></li>
            <li>函数的输出是<strong>固定长</strong></li>
            <li>已知 x，求 H(x) <strong>较为容易</strong></li>
            <li>已知 h，求 H(x) = h 在计算上<strong>不可行</strong> → <strong>单向哈希函数</strong></li>
            <li>已知 x，找出 y (y ≠ x) 使 H(y) = H(x) 在计算上不可行 → <strong>弱单向哈希函数</strong>（抗第二原像）</li>
            <li>找出任意两个不同 x, y 使 H(x) = H(y) 在计算上不可行 → <strong>强单向哈希函数</strong>（抗碰撞）</li>
          </ol>
        `
      },
      {
        id: "5-5",
        title: "哈希函数应用：Alice 与 Bob 的两种通信方案",
        tags: ["应用", "简答"],
        content: `
          <h4>方案一：加密消息 + 哈希值（E<sub>k</sub>(M|H(M))）</h4>
          <div class="example-box"><pre>
Alice                                    Bob
  M ──H()──→ H(M)
  M|H(M) ──E(Bob公钥)──→ 密文 ──发送──→ D(Bob私钥) → M, H(M)
  M ──H()──→ H(M)'  比较 H(M)' = H(M) ?  → 完整性 ✓ + 保密 ✓
          </pre></div>
          <ol>
            <li>Alice 用哈希函数 H 对消息 M 生成 H(M)</li>
            <li>Alice 用 Bob 的公钥加密 M 和 H(M) 的拼接：E<sub>k</sub>(M|H(M))</li>
            <li>Bob 用私钥解密，得到 M 和 H(M)</li>
            <li>Bob 对 M 重新计算哈希，与 H(M) 比较 → 验证<strong>完整性</strong>和<strong>来源</strong></li>
          </ol>
          <h4>方案二：明文传输 + 加密哈希值（M + E<sub>k</sub>(H(M))）</h4>
          <div class="example-box"><pre>
Alice                                    Bob
  M ──H()──→ H(M) ──E(Bob公钥)──→ E(H(M))
  发送: M（明文，可被窃听）+ E(H(M))  ──→  D(Bob私钥) → H(M)
  M ──H()──→ H(M)'  比较 → 完整性 ✓（不提供保密）
          </pre></div>
          <ol>
            <li>Alice 对 M 计算 H(M)</li>
            <li>Alice 用 Bob 的公钥<strong>只加密哈希值</strong>：E<sub>k</sub>(H(M))</li>
            <li>Alice 发送 M 和 E<sub>k</sub>(H(M))</li>
            <li>Bob 解密得到 H(M)，对 M 重新哈希并比较 → 验证完整性</li>
          </ol>
          <div class="tip-box"><strong>区别：</strong>方案一同时提供<strong>保密性</strong>；方案二 M 明文传输，仅哈希值加密，不提供消息保密。</div>
        `
      }
    ]
  },
  {
    id: "ch6",
    title: "第七章 数字签名",
    questions: [
      {
        id: "6-1",
        title: "数字签名应具有的五个特性",
        tags: ["重点", "简答", "必背"],
        content: `
          <ol>
            <li><strong>不可伪造性</strong>：除了签名者外，任何人都不能伪造签名者的合法签名</li>
            <li><strong>认证性</strong>：接收者相信这份签名来自签名者</li>
            <li><strong>不可重复使用性</strong>：一个消息的签名不能用于其他消息</li>
            <li><strong>不可修改性</strong>：一个消息在签名后不能被修改</li>
            <li><strong>不可否认性</strong>：签名者事后不能否认自己的签名</li>
          </ol>
          <div class="tip-box"><strong>记忆口诀：</strong>「伪认重改否」——不可伪造、认证、不可重用、不可修改、不可否认。</div>
          <h4>📊 五特性直观理解</h4>
          <div class="example-box"><pre>
不可伪造 → 别人不能冒充你签字
认证性   → 收件人确信是你签的
不可重用 → 这份签名只能用于这条消息，不能贴到别的消息上
不可修改 → 签完字后内容不能改（改了验证失败）
不可否认 → 签完不能抵赖（私钥只有你有）
          </pre></div>
        `
      },
      {
        id: "6-2",
        title: "RSA 数字签名",
        tags: ["重点", "计算题"],
        content: `
          <h4>📊 加密 vs 签名：密钥用法相反</h4>
          <div class="example-box"><pre>
RSA 加密（保密）:  明文 ──公钥 e──→ 密文 ──私钥 d──→ 明文
RSA 签名（认证）:  哈希 h ──私钥 d──→ 签名 S ──公钥 e──→ 验证 h

口诀：加密用公钥，签名用私钥；解密用私钥，验签用公钥
          </pre></div>
          <h4>签名过程</h4>
          <ol>
            <li>发送方对消息 M 计算哈希 h = H(M)</li>
            <li>用<strong>私钥 d</strong> 对 h 签名：S = h<sup>d</sup> mod n</li>
            <li>发送 M 和签名 S</li>
          </ol>
          <h4>验证过程</h4>
          <ol>
            <li>接收方对 M 计算 h' = H(M)</li>
            <li>用<strong>公钥 e</strong> 验证：h = S<sup>e</sup> mod n</li>
            <li>若 h = h'，则签名有效</li>
          </ol>
          <p>安全性基于 RSA 大数分解困难性和哈希函数的单向性。</p>
        `
      },
      {
        id: "6-3",
        title: "ElGamal 数字签名",
        tags: ["重点"],
        content: `
          <h4>密钥生成</h4>
          <p>选大素数 p 和本原根 g，私钥 x，公钥 y = g<sup>x</sup> mod p。</p>
          <h4>签名 (M)</h4>
          <ol>
            <li>选随机数 k，满足 gcd(k, p−1) = 1</li>
            <li>计算 r = g<sup>k</sup> mod p</li>
            <li>计算 s = k<sup>−1</sup>(H(M) − xr) mod (p−1)</li>
            <li>签名为 (r, s)</li>
          </ol>
          <h4>验证</h4>
          <p>验证 g<sup>H(M)</sup> ≡ y<sup>r</sup> · r<sup>s</sup> (mod p) 是否成立。</p>
          <h4>📊 ElGamal 签名流程</h4>
          <div class="example-box"><pre>
密钥：素数 p, 本原根 g; 私钥 x, 公钥 y = gˣ mod p

签名:  选随机 k → r = gᵏ mod p
              s = k⁻¹(H(M) − x·r) mod (p−1)
              输出 (r, s)

验证:  计算 g^H(M) mod p  是否等于  y^r · r^s mod p
          </pre></div>
          <div class="warn-box">⚠️ ElGamal 签名长度是明文的两倍，且每次签名需选不同的随机 k（k 泄露会导致私钥 x 被求出）。</div>
        `
      },
      {
        id: "6-4",
        title: "先签名后加密 vs 先加密后签名",
        tags: ["简答", "常考"],
        content: `
          <p><strong>问题：</strong>用户 A 想对消息 m 签名并秘密地发送给用户 B，应先签名后加密，还是先加密后签名？</p>
          <h4>解答：最好先签名（对明文签名），再加密</h4>
          <ol>
            <li>签名后的报文可以<strong>存储起来以便再次使用</strong>（向其他人提供该报文作为证据）</li>
            <li>若<strong>先加密后签名</strong>，验证过程设计不当可能导致<strong>安全威胁</strong>（如攻击者可将自己的签名附在他人加密消息上）</li>
          </ol>
          <div class="tip-box"><strong>标准流程：</strong>A 用私钥对 m 签名 → 用 B 的公钥加密 (m, sig) → B 解密后验证签名。</div>
        `
      }
    ]
  },
  {
    id: "ch7",
    title: "第八章 密码协议",
    questions: [
      {
        id: "7-1",
        title: "密码协议概述",
        tags: ["概念"],
        content: `
          <p><strong>密码协议</strong>（Cryptographic Protocol）是使用密码学原理实现特定安全目标的<strong>交互式过程</strong>，参与方通过交换消息完成密钥协商、身份认证、安全通信等任务。</p>
          <h4>常见密码协议类型</h4>
          <ul>
            <li><strong>密钥交换协议</strong>：如 Diffie-Hellman，在不安全信道上协商共享密钥</li>
            <li><strong>认证协议</strong>：验证通信双方身份（如挑战-应答）</li>
            <li><strong>安全通信协议</strong>：如 SSL/TLS，综合加密、认证、完整性保护</li>
          </ul>
          <h4>设计密码协议的原则</h4>
          <ul>
            <li>明确<strong>安全目标</strong>（保密性、认证性、完整性、不可否认性）</li>
            <li>考虑<strong>攻击者模型</strong>（能窃听、篡改、重放吗？）</li>
            <li>使用<strong>经证明安全</strong>的密码原语（加密、MAC、哈希、签名）</li>
            <li>防止<strong>重放攻击</strong>（时间戳、随机数 nonce、序列号）</li>
          </ul>
          <div class="warn-box">⚠️ 复习提纲中本章仅列出标题，以上内容为课程常见考点补充，可与课堂讲义对照复习。</div>
        `
      }
    ]
  },
  {
    id: "exam",
    title: "考点速览与解题指南",
    questions: [
      {
        id: "exam-1",
        title: "常考概念对比速记",
        tags: ["速览"],
        content: `
          <table class="compare-table">
            <tr><th>概念</th><th>要点</th></tr>
            <tr><td>对称 vs 非对称</td><td>密钥是否相同；速度；密钥管理</td></tr>
            <tr><td>分组 vs 流密码</td><td>加密单位；延迟；错误传播</td></tr>
            <tr><td>MAC vs Hash</td><td>MAC 用密钥；Hash 可不带密钥（MDC）</td></tr>
            <tr><td>弱单向 vs 强单向</td><td>第二原像 vs 碰撞</td></tr>
            <tr><td>加密 vs 签名</td><td>公钥加密保密；私钥签名认证</td></tr>
          </table>
        `
      },
      {
        id: "exam-2",
        title: "RSA 计算题步骤",
        tags: ["计算题"],
        content: `
          <ol>
            <li>选 p, q → 算 n = pq, φ(n) = (p−1)(q−1)</li>
            <li>选 e，gcd(e, φ(n)) = 1</li>
            <li>扩展欧几里得求 d，使 ed ≡ 1 (mod φ(n))</li>
            <li>加密 c = m<sup>e</sup> mod n；解密 m = c<sup>d</sup> mod n</li>
            <li>签名 S = h<sup>d</sup> mod n；验证 h = S<sup>e</sup> mod n</li>
          </ol>
        `
      },
      {
        id: "exam-3",
        title: "分组密码设计要点",
        tags: ["简答"],
        content: `
          <p>答 S 盒（混淆）、P 盒（扩散/雪崩）、轮函数 F（非线性度、抗差分/线性分析）、迭代轮数、密钥扩展算法五个要点，并说明 S-P 网络的作用。</p>
        `
      }
    ]
  }
];
