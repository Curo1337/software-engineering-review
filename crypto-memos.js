/* 密码学各节大白话解释 + 记忆口诀 */
const STUDY_MEMOS = {
  "1-1": {
    plain: "对称密码就像<strong>同一把钥匙</strong>锁门和开门，双方必须有同一把钥匙。公钥密码像<strong>邮箱</strong>：谁都能往投信口塞信（公钥加密），只有你有钥匙取信（私钥解密）。",
    memory: "对称记「<strong>分组 + 流</strong>」，非对称记「<strong>公钥公开、私钥保密</strong>」。速度：对称快，非对称慢。"
  },
  "1-2": {
    plain: "好密码要满足两件事：自己人加解密<strong>要方便</strong>，坏人没密钥<strong>算不出来</strong>。就像保险箱——主人秒开，小偷撬不开。",
    memory: "两条：<strong>合法易、攻击难</strong>。关键词「计算上不可行」必写！"
  },
  "1-3": {
    plain: "黑客三板斧：暴力试钥匙、看规律猜内容、用数学硬解。对策就是：钥匙够多、规律打乱、算法够硬。",
    memory: "穷举→<strong>加大密钥</strong>；统计→<strong>统计规律不同</strong>；数学→<strong>复杂算法</strong>。"
  },
  "1-4": {
    plain: "置换密码是<strong>打乱顺序</strong>（字还在，位置变了）；代替密码是<strong>换字</strong>（A 变 D）。单表=一张对照表，多表=多张表轮换用。",
    memory: "置换=<strong>易位</strong>；代替=<strong>代换</strong>。倒置法是最简单易位。"
  },
  "1-5": {
    plain: "密码可以从不同角度分类：按历史（手工到电脑）、按操作（换字还是移位）、按保密程度、按分组还是流、按对称还是非对称。",
    memory: "五种划分：<strong>历史、操作、保密、处理、密钥</strong>。最常考：替代/移位、分组/序列、对称/非对称。"
  },
  "2-1": {
    plain: "流密码像<strong>逐字打马赛克</strong>，来一个字符处理一个，适合实时通信；分组密码要凑满一整块再加密。",
    memory: "流密码=<strong>逐位 + 低延迟</strong>，常与对称密码一起考对比。"
  },
  "3-1": {
    plain: "分组密码核心是<strong>换字符（S盒）+ 打乱位置（P盒）</strong>，多轮重复，让改一个比特影响一大片输出（雪崩）。",
    memory: "SP 网络 = <strong>代换 + 置换 + 多轮</strong>。DES 用 Feistel，AES 用 SP。"
  },
  "3-2": {
    plain: "S 盒负责<strong>搞乱</strong>，P 盒负责<strong>扩散</strong>，轮函数要够乱还要够快，还要防差分和线性分析两种数学攻击。",
    memory: "S=<strong>混淆</strong>，P=<strong>雪崩/扩散</strong>，F=<strong>安全+速度+灵活</strong>。"
  },
  "3-3": {
    plain: "轮数越多越安全但越慢；密钥扩展就是把一把主钥匙变成很多把轮钥匙，每轮用不同的。",
    memory: "简答两点：<strong>轮数=安全与速度权衡</strong>；<strong>密钥扩展=主密钥→各轮子密钥</strong>。"
  },
  "4-1": {
    plain: "对称密码最难两件事：<strong>怎么把钥匙交给对方</strong>和<strong>怎么在电脑上签字</strong>。公钥密码就是为了解决这两个问题发明的。",
    memory: "提出背景：<strong>密钥分配 + 数字签字</strong>。公钥公开，私钥保密。"
  },
  "4-2": {
    plain: "给每个文件存完整签名太占空间，所以先<strong>压缩成短串（认证符）</strong>再签名。但用私钥加密只能证明是你写的，别人仍能偷看——要保密得双重加密。",
    memory: "认证符=<strong>压缩 + 不可篡改</strong>。私钥加密→可认证但<strong>不保密</strong>。"
  },
  "4-3": {
    plain: "RSA 就是选两个大素数，公钥用来加密（e, n），私钥用来解密（d, n）。安全性靠<strong>大数分解很难</strong>。",
    memory: "RSA 五步：<strong>选 pq → 算 φ → 选 e → 求 d → 加解密</strong>。c=m<sup>e</sup> mod n。"
  },
  "5-1": {
    plain: "消息认证就是确认<strong>谁发的</strong>和<strong>有没有被改</strong>。三种手段：整段加密、MAC 校验码、Hash 摘要。",
    memory: "认证两要素：<strong>真实性 + 完整性</strong>。三类函数：<strong>加密 / MAC / Hash</strong>。"
  },
  "5-2": {
    plain: "MAC 像带密钥的_checksum_：双方有同一把密钥，发件人算个短码贴上去，收件人重算比对。能验身份和完整性，但不加密内容。",
    memory: "MAC = C(k,m)，<strong>多对一、不可逆、不提供保密</strong>。三要求：难伪造、均匀分布、用满所有比特。"
  },
  "5-3": {
    plain: "Hash 把任意长消息变成固定短指纹。带密钥的叫 MAC，不带密钥的叫 MDC。单向、确定性、抗碰撞。",
    memory: "带密钥→<strong>MAC</strong>；不带密钥→<strong>MDC</strong>。五性质：单向、确定、快速、抗碰撞、定长。"
  },
  "5-4": {
    plain: "好 Hash 要：好算正推、难反推、难找第二个碰撞（弱）、难找任意两个碰撞（强）。",
    memory: "弱单向=<strong>抗第二原像</strong>；强单向=<strong>抗碰撞</strong>。输入任意长，输出固定长。"
  },
  "5-5": {
    plain: "方案一：消息和哈希一起加密→又保密又验真。方案二：消息明文发，只加密哈希→只验真不保密。",
    memory: "E(M|H(M))=<strong>保密+认证</strong>；M + E(H(M))=<strong>只认证</strong>。"
  },
  "6-1": {
    plain: "数字签名五要求：别人不能假签、你认得出是谁签的、签名不能挪到别的消息、签完不能改、签完不能赖。",
    memory: "五特性：<strong>不可伪造、认证、不可重用、不可修改、不可否认</strong>。口诀「伪认重改否」。"
  },
  "6-2": {
    plain: "RSA 签名：用私钥对哈希签名，用公钥验证。和加密反过来——加密用公钥，签名用私钥。",
    memory: "签名 S=h<sup>d</sup> mod n；验证 h=S<sup>e</sup> mod n。先哈希再签！"
  },
  "6-3": {
    plain: "ElGamal 签名每次要随机数 k，签名是 (r,s) 两个数，验证一个同余式。比 RSA 签名长但基于离散对数。",
    memory: "ElGamal：r=g<sup>k</sup> mod p，s=k<sup>−1</sup>(H(M)−xr)。验证 g<sup>H(M)</sup>≡y<sup>r</sup>r<sup>s</sup>。"
  },
  "6-4": {
    plain: "先签名再加密最稳妥：签名绑在明文上，加密保护隐私。先加密后签名可能被坏人钻空子替换签名。",
    memory: "顺序：<strong>先签名（私钥）→ 再加密（对方公钥）</strong>。可存证、更安全。"
  },
  "7-1": {
    plain: "密码协议就是多人按规则用密码工具交互，比如协商密钥、证明身份。要防窃听、篡改和重放。",
    memory: "常见三类：<strong>密钥交换、认证、安全通信</strong>。防重放用 nonce/时间戳。"
  },
  "exam-1": {
    plain: "考试爱考对比表：对称/非对称、分组/流、MAC/Hash、加密/签名，背清楚区别就能拿分。",
    memory: "对比题优先画<strong>表格</strong>作答，阅卷清晰。"
  },
  "exam-2": {
    plain: "RSA 计算题就五步：选素数、算 φ、选 e、求 d、模幂运算。手算用平方-乘算法。",
    memory: "必背：<strong>n=pq, φ=(p−1)(q−1), ed≡1(mod φ)</strong>。"
  },
  "exam-3": {
    plain: "分组密码设计简答题：S 混淆、P 扩散、F 要抗分析、轮数够多、密钥扩展合理，五个点答全。",
    memory: "简答模板：<strong>S + P + F + 轮数 + 密钥扩展 + S-P 网络目的</strong>。"
  }
};
