/* 网络安全总复习 - 详细解析数据 */
const REVIEW_DATA = [
  {
    id: "ch1",
    title: "第一章 计算机安全基础",
    questions: [
      {
        id: "1-1",
        title: "CIA三元组与安全基本概念",
        tags: ["重点", "简答", "常考"],
        content: `
          <h4>CIA 三元组</h4>
          <table class="compare-table">
            <tr><th>属性</th><th>含义</th><th>考点</th></tr>
            <tr>
              <td><strong>机密性（Confidentiality）</strong></td>
              <td>
                <ul>
                  <li><strong>数据机密性</strong>：保证私有或机密信息不会被泄露给未经授权的个体</li>
                  <li><strong>隐私性</strong>：保证个人可以控制和影响与之相关的信息收集、存储和泄露</li>
                </ul>
              </td>
              <td>被动攻击主要威胁</td>
            </tr>
            <tr>
              <td><strong>完整性（Integrity）</strong></td>
              <td>
                <ul>
                  <li><strong>数据完整性</strong>：保证只能以特定、已授权的方式更改信息和代码</li>
                  <li><strong>系统完整性</strong>：保证系统正常实现其预期功能，不被故意或偶然的非授权操作控制</li>
                </ul>
              </td>
              <td>主动攻击主要威胁</td>
            </tr>
            <tr>
              <td><strong>可用性（Availability）</strong></td>
              <td>保证系统及时运转，其服务不会拒绝已授权的用户访问</td>
              <td>DoS/DDoS 攻击目标</td>
            </tr>
          </table>
          <h4>计算机安全定义</h4>
          <p>保护自动化信息系统免受<strong>未经授权的访问、使用、披露、破坏、修改或销毁</strong>。</p>
          <div class="tip-box"><strong>💡 考点：</strong>CIA 是信息安全三大基本目标，考试常要求分别说明含义并举例对应威胁类型。</div>
        `
      },
      {
        id: "1-2",
        title: "攻击树（Attack Tree）",
        tags: ["重点", "简答"],
        content: `
          <p><strong>攻击树</strong>是 Bruce Schneier 提出的威胁建模方法，以<strong>结构化</strong>方式表示攻击的多种可能路径，类似于<strong>决策树的倒置形式</strong>。</p>
          <h4>攻击树结构</h4>
          <ul>
            <li><strong>根节点</strong>：攻击者的总体目标（如「获得系统管理员权限」）</li>
            <li><strong>子节点</strong>：实现目标的子目标</li>
            <li><strong>叶节点</strong>：具体的攻击动作或方法</li>
            <li><strong>关系节点</strong>：
              <ul>
                <li><strong>AND 节点</strong>：所有子节点都必须成功（必须全部实现）</li>
                <li><strong>OR 节点</strong>：任一子节点成功即成功（任一即可）</li>
              </ul>
            </li>
          </ul>
          <h4>攻击树的作用</h4>
          <ul>
            <li>系统化分析攻击路径和防御点</li>
            <li>在评估威胁、分类威胁方面发挥重要作用</li>
            <li>配合<strong>攻击面（Attack Surface）</strong>分析，识别系统暴露的入口</li>
          </ul>
          <div class="example-box"><pre>
攻击目标：获得管理员权限（根节点，OR）
  ├─ 暴力破解密码（叶节点）
  ├─ 利用缓冲区溢出（叶节点）
  └─ 社会工程学（AND）
       ├─ 获取员工信任
       └─ 诱导泄露凭证
          </pre></div>
        `
      },
      {
        id: "1-3",
        title: "网络攻击分类：主动攻击与被动攻击",
        tags: ["重点", "常考", "对比"],
        content: `
          <p>网络攻击主要分为<strong>两大类别</strong>：</p>
          <table class="compare-table">
            <tr><th>类别</th><th>特征</th><th>威胁属性</th><th>具体类型</th></tr>
            <tr>
              <td><strong>主动攻击</strong></td>
              <td>攻击者主动对目标系统的数据流或系统资源进行<strong>修改、破坏</strong>，直接影响系统的可用性、完整性和真实性</td>
              <td>完整性、可用性、真实性</td>
              <td>
                <strong>6 类</strong>：
                <ol>
                  <li>假冒（Masquerade）</li>
                  <li>篡改（Modification）</li>
                  <li>重放（Replay）</li>
                  <li>拒绝服务（DoS）</li>
                  <li>会话劫持</li>
                  <li>恶意代码攻击</li>
                </ol>
              </td>
            </tr>
            <tr>
              <td><strong>被动攻击</strong></td>
              <td>攻击者<strong>不修改</strong>数据或系统，仅通过监听、截取等方式获取目标信息</td>
              <td>保密性（机密性）</td>
              <td>
                <strong>3 类</strong>：
                <ol>
                  <li>网络监听（窃听）</li>
                  <li>流量分析</li>
                  <li>数据泄露攻击</li>
                </ol>
              </td>
            </tr>
          </table>
          <div class="tip-box"><strong>记忆口诀：</strong>主动 6 类「假改重拒劫码」，被动 3 类「听流泄」；主动改数据，被动只偷看。</div>
        `
      },
      {
        id: "1-4",
        title: "网络攻击模型（8 个阶段）",
        tags: ["重点", "简答", "常考"],
        content: `
          <p>网络攻击模型将攻击过程划分为 <strong>8 个阶段</strong>，按顺序记忆：</p>
          <table class="compare-table">
            <tr><th>阶段</th><th>内容</th></tr>
            <tr><td>① 攻击身份和位置隐藏</td><td>隐藏网络攻击者的身份及主机位置</td></tr>
            <tr><td>② 目标系统信息收集</td><td>确定攻击目标并收集目标相关信息</td></tr>
            <tr><td>③ 弱点信息挖掘分析</td><td>从收集到的目标信息中提取可使用的漏洞信息</td></tr>
            <tr><td>④ 目标使用权限获取</td><td>获取目标系统的普通或特权账户权限</td></tr>
            <tr><td>⑤ 攻击行为隐藏</td><td>隐藏在目标系统中的操作，防止攻击行为被发现</td></tr>
            <tr><td>⑥ 攻击实施</td><td>实施攻击或者以目标系统为跳板向其他系统发起新的攻击</td></tr>
            <tr><td>⑦ 开辟后门</td><td>在目标系统中开辟后门，方便以后入侵</td></tr>
            <tr><td>⑧ 攻击痕迹清除</td><td>清除攻击痕迹，逃避攻击取证</td></tr>
          </table>
          <div class="tip-box"><strong>💡 考点：</strong>常考按顺序写出 8 阶段，或给定场景判断处于哪个阶段（如 Nmap 扫描属于②信息收集）。</div>
        `
      }
    ]
  },
  {
    id: "ch2",
    title: "第二章 网络探测与扫描",
    questions: [
      {
        id: "2-1",
        title: "系统存活探测：Non-ICMP ECHO 技术",
        tags: ["重点", "简答"],
        content: `
          <p>在渗透测试的<strong>信息收集</strong>阶段，首先需要确定目标主机是否在线（存活探测）。</p>
          <h4>Non-ICMP ECHO 探测</h4>
          <ul>
            <li>许多防火墙<strong>不允许 ICMP ECHO 数据报</strong>（ping）通过</li>
            <li>使用<strong>非 ECHO 请求</strong>的 ICMP 数据包可有效识别主机系统</li>
            <li>Non-ECHO ICMP 技术不仅能探测主机，也可以探测<strong>网络设备</strong>（如路由器）</li>
          </ul>
          <h4>常见存活探测方式对比</h4>
          <table class="compare-table">
            <tr><th>方式</th><th>原理</th><th>优缺点</th></tr>
            <tr><td>ICMP ECHO（ping）</td><td>发送 ICMP 回显请求，等待应答</td><td>简单直接，但常被防火墙拦截</td></tr>
            <tr><td>Non-ICMP ECHO</td><td>使用其他 ICMP 类型（如时间戳请求等）</td><td>可绕过禁止 ECHO 的防火墙</td></tr>
            <tr><td>TCP SYN/ACK 探测</td><td>向常见端口发送 SYN，观察响应</td><td>不依赖 ICMP，适用性广</td></tr>
          </table>
          <div class="tip-box"><strong>💡 考点：</strong>理解为何需要 Non-ICMP 探测——防火墙策略导致传统 ping 失效。</div>
        `
      },
      {
        id: "2-2",
        title: "Idle Scan（空闲扫描）",
        tags: ["重点", "简答", "常考"],
        content: `
          <p><strong>Idle Scan</strong>是一种高级端口扫描技术，属于<strong>扫描扫射</strong>方法，攻击者无需直接向目标发送完整探测序列。</p>
          <h4>问题背景</h4>
          <p>若攻击者发送的 SYN 数据报使用<strong>虚假源地址</strong>，目标主机返回的 SYN/ACK 或 RST 会发往虚假地址，攻击者无法直接收到响应。</p>
          <h4>两种解决方法</h4>
          <ul>
            <li><strong>方法 1</strong>：攻击者将真实源地址隐藏在许多<strong>虚假诱饵地址</strong>中</li>
            <li><strong>方法 2</strong>：<strong>假冒空闲主机扫描（Idle Scan）</strong>——利用第三方空闲主机</li>
          </ul>
          <h4>Idle Scan 原理</h4>
          <ul>
            <li>不构造分段报文，利用操作系统发送不分段 IP 报文时，<strong>Identification 字段有规律变化</strong>（递增或间隔递增）的特点</li>
            <li>三台主机角色：
              <ul>
                <li><strong>S</strong>——扫描主机（攻击者）</li>
                <li><strong>M</strong>——攻击者假冒的第三方<strong>空闲中间主机</strong></li>
                <li><strong>T</strong>——目标主机</li>
              </ul>
            </li>
            <li>通过观察 M 的 IP ID 变化推断 T 端口开放状态，实现<strong>匿名扫描</strong></li>
          </ul>
          <div class="example-box"><pre>
Idle Scan 流程（简化）：
  S → M：探测 M 的 IP ID（基准值 id0）
  S → T：以 M 的地址为源，向 T 某端口发 SYN
  若 T 端口开放：T → M 回 SYN/ACK，M 向 T 回 RST，IP ID 递增
  S → M：再次探测 M 的 IP ID
  若 id 增加了 1 → 该端口开放；未变 → 端口关闭/过滤
          </pre></div>
        `
      },
      {
        id: "2-3",
        title: "栈指纹识别（Stack Fingerprinting）",
        tags: ["重点", "简答", "对比"],
        content: `
          <p><strong>栈指纹识别</strong>是指通过分析远程主机操作系统实现的协议栈对不同请求的<strong>响应差异</strong>来区分操作系统。</p>
          <h4>主动探测 vs 被动探测</h4>
          <table class="compare-table">
            <tr><th>类型</th><th>方式</th><th>特点</th></tr>
            <tr><td><strong>主动探测</strong></td><td>向目标主机<strong>主动发送</strong>探测数据报</td><td>可精确识别，但会留下扫描痕迹</td></tr>
            <tr><td><strong>被动探测</strong></td><td>通过分析<strong>嗅探到的正常数据报</strong>判别远程操作系统</td><td>隐蔽性强，无需主动发包</td></tr>
          </table>
          <h4>两种指纹识别技术</h4>
          <ul>
            <li><strong>（a）TCP/IP 栈指纹识别</strong>：分析操作系统的 TCP/IP 协议栈对不同请求在响应上的差异（基于 <strong>IP 数据报</strong>特征，如 TTL、窗口大小、选项字段等）</li>
            <li><strong>（b）ICMP 栈指纹识别</strong>：分析操作系统的 ICMP 协议栈对不同请求在响应上的差异（基于 <strong>ICMP 数据报</strong>特征）</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>Nmap 的 -O 选项即利用栈指纹识别判断目标 OS；不同 OS 对异常包的响应方式不同。</div>
        `
      },
      {
        id: "2-4",
        title: "常用扫描工具",
        tags: ["常考", "填空"],
        content: `
          <h4>扫描器概念</h4>
          <p>扫描器是一种<strong>自动检测远程或本地主机安全弱点</strong>的程序。它不是直接的攻击程序，仅帮助发现目标机器的某些内在弱点，再利用其他方法进行恶意攻击。</p>
          <table class="compare-table">
            <tr><th>工具</th><th>类型/平台</th><th>功能特点</th></tr>
            <tr><td><strong>Nmap</strong></td><td>免费端口扫描工具（代表工具）</td><td>端口扫描、OS 检测、服务版本探测、脚本引擎</td></tr>
            <tr><td><strong>SuperScan</strong></td><td>Windows 端口扫描工具</td><td>快速扫描主机开放端口、服务及 OS 信息</td></tr>
            <tr><td><strong>Wireshark</strong></td><td>开源网络协议分析嗅探器</td><td>实时捕获并解析数据包，支持上千种协议；排查故障、分析流量异常、检测攻击</td></tr>
            <tr><td>SATAN</td><td>UNIX 安全管理工具</td><td>分析网络安全、测试和报告</td></tr>
            <tr><td>Jakal</td><td>秘密扫描器</td><td>扫描防火墙后面区域，不留下痕迹</td></tr>
            <tr><td>NSS</td><td>隐蔽扫描器</td><td>高度隐蔽的扫描</td></tr>
            <tr><td>Strobe</td><td>TCP 端口扫描器</td><td>记录指定机器的所有开放端口</td></tr>
            <tr><td>XSCAN</td><td>X 服务器弱点扫描</td><td>扫描具有 X 服务器弱点的子网或主机</td></tr>
          </table>
          <div class="tip-box"><strong>记忆重点：</strong>考试最常考 <strong>Nmap</strong>（扫描）、<strong>Wireshark</strong>（嗅探/协议分析）、<strong>SuperScan</strong>（Windows 扫描）。</div>
        `
      }
    ]
  },
  {
    id: "ch3",
    title: "第三章 入侵与恶意攻击",
    questions: [
      {
        id: "3-1",
        title: "缓冲区溢出攻击",
        tags: ["重点", "简答", "常考"],
        content: `
          <h4>缓冲区溢出与缓冲区溢出攻击的关系</h4>
          <ul>
            <li><strong>（1）缓冲区溢出攻击发生的前提</strong>：目标系统中某软件存在<strong>缓冲区溢出的漏洞</strong></li>
            <li><strong>（2）</strong>软件存在缓冲区溢出漏洞，<strong>本身不会产生攻击行为</strong></li>
            <li><strong>（3）</strong>软件存在缓冲区溢出漏洞，被攻击者<strong>利用并发起攻击行为</strong></li>
          </ul>
          <h4>攻击原理</h4>
          <p>向程序的缓冲区写入<strong>超出其容量</strong>的数据，覆盖相邻内存区域（如返回地址、函数指针），使程序跳转到攻击者植入的<strong>恶意代码</strong>执行。</p>
          <div class="example-box"><pre>
栈帧布局（简化）：
  高地址 ┌─────────────┐
         │  返回地址    │ ← 溢出数据覆盖此处
         ├─────────────┤
         │  局部变量    │
         ├─────────────┤
         │  缓冲区 buf  │ ← 写入超长输入
  低地址 └─────────────┘

攻击流程：输入超长数据 → 覆盖返回地址 → 跳转到 shellcode
          </pre></div>
          <div class="tip-box"><strong>💡 考点：</strong>区分「漏洞」与「攻击」——漏洞是被利用的条件，攻击是主动行为；常结合栈结构画图说明。</div>
        `
      },
      {
        id: "3-2",
        title: "压缩病毒（CV）隐身原理",
        tags: ["重点", "简答"],
        content: `
          <p>典型的压缩病毒代表是 <strong>CV</strong>，可对感染文件进行压缩，使感染前后文件长度<strong>几乎相同</strong>，实现隐身。</p>
          <h4>核心思路</h4>
          <p>用<strong>压缩宿主文件</strong>来抵消病毒体积，让感染前后文件大小保持一致。</p>
          <div class="example-box"><pre>
正常文件压缩病毒感染过程：

  原始文件: 100KB
      ↓ 压缩为 50KB（宿主压缩）
      ↓ 附加病毒: 50KB
  未压缩时: 100KB + 50KB = 150KB  → 文件明显增大，容易暴露！

  CV 压缩病毒:
  最终文件: 50KB（压缩宿主）+ 50KB（病毒）= 100KB
  → 文件大小几乎不变！难以被发现
          </pre></div>
          <ul>
            <li>感染前：原始文件 100KB</li>
            <li>压缩宿主：100KB → 50KB，腾出 50KB 空间</li>
            <li>写入病毒：50KB 病毒填入腾出的空间</li>
            <li>感染后：总大小仍为 100KB，<strong>文件大小几乎不变</strong></li>
          </ul>
          <div class="tip-box"><strong>教材位置：</strong>P257-258。考点：解释 CV 如何通过压缩宿主实现隐身。</div>
        `
      },
      {
        id: "3-3",
        title: "分布式拒绝服务攻击（DDoS）",
        tags: ["重点", "简答", "常考"],
        content: `
          <p><strong>DDoS</strong>（Distributed Denial of Service）利用<strong>僵尸网络</strong>对目标发起海量请求，耗尽目标资源导致服务瘫痪。</p>
          <h4>DDoS 架构</h4>
          <ul>
            <li><strong>攻击者</strong> → <strong>C&C 主控端</strong>：下达攻击指令</li>
            <li><strong>僵尸网络</strong>（数万台肉鸡）：代理端对目标实施海量请求</li>
            <li><strong>攻击目标</strong>：服务器资源耗尽，服务瘫痪</li>
          </ul>
          <h4>两大攻击类型</h4>
          <table class="compare-table">
            <tr><th>类型</th><th>攻击目标</th><th>典型手段</th></tr>
            <tr>
              <td><strong>资源消耗型</strong></td>
              <td>消耗 CPU、内存、磁盘 I/O</td>
              <td>Slowloris、CC 攻击</td>
            </tr>
            <tr>
              <td><strong>流量淹没型</strong></td>
              <td>消耗网络带宽</td>
              <td>UDP 洪水、SYN 洪水</td>
            </tr>
          </table>
          <div class="tip-box"><strong>💡 考点：</strong>DDoS 与 DoS 区别——DDoS 使用<strong>分布式</strong>僵尸网络，规模更大、更难追踪；威胁<strong>可用性</strong>。</div>
        `
      }
    ]
  },
  {
    id: "ch4",
    title: "第四章 防火墙与入侵检测",
    questions: [
      {
        id: "4-1",
        title: "防火墙的必要性与功能",
        tags: ["重点", "简答"],
        content: `
          <p>防火墙设置在<strong>驻地网和互联网之间</strong>，建立二者之间的可控链接，为驻地网搭建安全的边界环境。</p>
          <h4>主要功能</h4>
          <ul>
            <li>保护驻地网不受基于互联网的攻击</li>
            <li>提供能加强<strong>安全性和审计</strong>的遏制点</li>
            <li>把内部系统与外部网络<strong>隔离</strong>，提供额外的防御层</li>
            <li>体现军事原则「<strong>纵深防御</strong>」在 IT 安全中的应用</li>
          </ul>
          <h4>部署形式</h4>
          <ul>
            <li>可以是<strong>单机系统</strong></li>
            <li>也可以是协作完成防火墙功能的<strong>两个或更多系统</strong></li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>防火墙是网络边界的第一道防线，但不能替代主机级安全（纵深防御思想）。</div>
        `
      },
      {
        id: "4-2",
        title: "入侵检测：统计异常检测与基于规则的检测",
        tags: ["重点", "简答", "对比", "常考"],
        content: `
          <p>入侵检测系统（IDS）有 <strong>2 种</strong>基本检测方法，实际应用中通常<strong>结合使用</strong>。</p>
          <table class="compare-table">
            <tr><th>方法</th><th>原理</th><th>优点</th><th>局限</th></tr>
            <tr>
              <td><strong>统计异常检测</strong></td>
              <td>收集一定时间内与合法用户行为相关的数据集合，用<strong>统计方法</strong>定义普通或期望的行为</td>
              <td>检测<strong>假冒用户</strong>的有效手段（假冒者不能完全模仿合法用户行为）</td>
              <td><strong>不能有效检测违规用户</strong>（合法用户的违规行为）</td>
            </tr>
            <tr>
              <td><strong>基于规则的检测</strong></td>
              <td>定义一套判断某种行为是否为入侵者行为的<strong>规则</strong>，一般采用<strong>黑名单</strong>方式</td>
              <td>能检测已知的明确违规行为和攻击模式</td>
              <td>难以发现未知的新型攻击</td>
            </tr>
          </table>
          <div class="tip-box"><strong>💡 考点：</strong>统计方法定义「正常行为」，规则方法定义「正确/违规行为」；两者互补——统计检假冒，规则检违规。</div>
        `
      },
      {
        id: "4-3",
        title: "蜜罐（Honeypot）",
        tags: ["重点", "简答"],
        content: `
          <p>蜜罐是一个<strong>主动诱骗系统</strong>，用来把潜在的攻击者从重要系统中引诱开。</p>
          <h4>设计目的</h4>
          <ul>
            <li><strong>转移</strong>攻击者对重要系统的访问</li>
            <li><strong>收集</strong>关于攻击者活动的信息</li>
            <li><strong>延留</strong>攻击者足够长时间，以便管理员做出反应</li>
          </ul>
          <h4>部署位置</h4>
          <table class="compare-table">
            <tr><th>位置</th><th>作用</th></tr>
            <tr><td>外部防火墙之外（位置 1）</td><td>追踪尝试在网络内连接<strong>未使用 IP 地址</strong>的行为</td></tr>
            <tr><td>完全内部（位置 3）</td><td>捕捉<strong>内部攻击</strong>（最重要优点）</td></tr>
          </table>
          <div class="tip-box"><strong>💡 考点：</strong>蜜罐是主动防御手段，与 IDS 被动监测不同；内部蜜罐可发现内鬼/横向移动。</div>
        `
      }
    ]
  },
  {
    id: "ch5",
    title: "第五章 认证协议",
    questions: [
      {
        id: "5-1",
        title: "Kerberos V4 三轮认证交换",
        tags: ["重点", "简答", "常考"],
        content: `
          <p>Kerberos 是一种基于<strong>可信第三方</strong>的认证方案，V4 包含三个核心服务器角色：</p>
          <ul>
            <li><strong>AS</strong>（认证服务器）：用户向 AS 发起认证请求，AS 提供验证凭证</li>
            <li><strong>TGS</strong>（票据授权服务器）：拥有 TGT 后可请求多个应用服务器的<strong>服务授权票据</strong></li>
            <li><strong>V</strong>（应用服务器）：提供实际服务</li>
          </ul>
          <h4>（a）AS 交换——获取票据授权票据（TGT）</h4>
          <div class="example-box"><pre>
C → AS:  IDc || IDtgs || TS1
AS → C:  E(Kc, [Kc,tgs || IDtgs || TS2 || Lifetime2 || Tickettgs])
         Tickettgs = E(Ktgs, [Kc,tgs || IDc || ADc || IDtgs || TS2 || Lifetime2])
          </pre></div>
          <h4>（b）TGS 交换——获取服务票据</h4>
          <div class="example-box"><pre>
C → TGS:  IDv || Tickettgs || Authenticatorc
TGS → C:  E(Kc,tgs, [Kc,v || IDv || TS4 || Ticketv])
         Ticketv = E(Kv, [Kc,v || IDc || ADc || IDv || TS4 || Lifetime4])
         Authenticatorc = E(Kc,tgs, [IDc || ADc || TS3])
          </pre></div>
          <h4>（c）C/V 交换——客户端/服务器认证</h4>
          <div class="example-box"><pre>
C → V:  Ticketv || Authenticatorc
V → C:  E(Kc,v, [TS5 + 1])   （双向认证）
         Authenticatorc = E(Kc,v, [IDc || ADc || TS5])
          </pre></div>
          <div class="tip-box"><strong>💡 考点：</strong>三轮交换顺序 AS→TGS→V；Tickettgs 用 Ktgs 加密，Ticketv 用 Kv 加密；时间戳 TS 防重放。</div>
        `
      },
      {
        id: "5-2",
        title: "可扩展认证协议（EAP）",
        tags: ["重点", "简答"],
        content: `
          <p><strong>EAP</strong>（Extensible Authentication Protocol）是一个支持<strong>多种认证方式</strong>的认证框架。</p>
          <h4>运行层次</h4>
          <ul>
            <li>主要运行在<strong>数据链路层及网络层</strong></li>
            <li>如 PPP 或 IEEE 802，<strong>不需要 IP</strong></li>
          </ul>
          <h4>核心优点：灵活性</h4>
          <ul>
            <li>封装许多客户端和认证服务器之间使用的<strong>认证方法</strong></li>
            <li>可用于选择特殊认证机制——认证端请求更多信息后判断是否使用特定方法</li>
            <li>为客户端系统与认证服务器之间交换认证信息提供<strong>通用传输服务</strong></li>
          </ul>
          <table class="compare-table">
            <tr><th>对比项</th><th>EAP</th><th>传统固定协议</th></tr>
            <tr><td>认证方法</td><td>可扩展，支持多种</td><td>固定单一方式</td></tr>
            <tr><td>运行层</td><td>数据链路层/网络层</td><td>通常应用层</td></tr>
            <tr><td>IP 依赖</td><td>不需要 IP</td><td>通常需要</td></tr>
          </table>
        `
      }
    ]
  },
  {
    id: "ch6",
    title: "第六章 传输与应用安全",
    questions: [
      {
        id: "6-1",
        title: "TLS 体系结构（四层协议）",
        tags: ["重点", "简答", "常考"],
        content: `
          <p><strong>TLS</strong>（Transport Layer Security）提供传输层安全，分为较高层和较低层协议。</p>
          <h4>较高层协议（3 个）</h4>
          <ul>
            <li><strong>TLS 握手协议</strong>：协商加密算法、交换密钥、认证身份</li>
            <li><strong>TLS 修改密码规范协议</strong>：通知对方后续记录将使用新协商的密码参数</li>
            <li><strong>TLS 警报协议</strong>：传递警告或错误信息，可终止连接</li>
          </ul>
          <h4>较低层协议（1 个）</h4>
          <ul>
            <li><strong>TLS 记录协议</strong>：对上层数据进行分片、压缩（可选）、加 MAC、加密，封装成 TLS 记录</li>
          </ul>
          <table class="compare-table">
            <tr><th>协议</th><th>层次</th><th>功能</th></tr>
            <tr><td>握手协议</td><td>较高层</td><td>密钥协商、身份认证</td></tr>
            <tr><td>修改密码规范协议</td><td>较高层</td><td>切换加密状态</td></tr>
            <tr><td>警报协议</td><td>较高层</td><td>错误/警告通知</td></tr>
            <tr><td>记录协议</td><td>较低层</td><td>数据封装、加密、完整性保护</td></tr>
          </table>
        `
      },
      {
        id: "6-2",
        title: "HTTPS",
        tags: ["重点", "简答", "常考"],
        content: `
          <p><strong>HTTPS</strong> = HTTP over SSL/TLS，将 HTTP 与 SSL/TLS 相结合，实现浏览器与服务器之间的<strong>安全通信</strong>。</p>
          <ul>
            <li>规范文档：RFC 2818</li>
            <li>SSL 之上的 HTTP 和 TLS 之上的 HTTP <strong>没有根本性区别</strong>，统称 HTTPS</li>
            <li>URL 以 <strong>https://</strong> 开头（而非 http://）</li>
            <li>使用 <strong>443 端口</strong>（而非 80 端口）</li>
          </ul>
          <h4>被加密的通信元素</h4>
          <ul>
            <li>URL</li>
            <li>文件内容</li>
            <li>浏览器表单内容</li>
            <li>Cookie</li>
            <li>HTTP 报头内容</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>HTTPS 端口 443；加密范围包括 URL、表单、Cookie、报头；底层可用 SSL 或 TLS。</div>
        `
      },
      {
        id: "6-3",
        title: "SSH 协议与前向保密性",
        tags: ["重点", "简答"],
        content: `
          <p><strong>SSH</strong>（Secure Shell）提供安全的远程登录和命令执行，其协议栈具备<strong>前向保密性（Forward Secrecy）</strong>。</p>
          <h4>前向保密性含义</h4>
          <p>即使长期私钥日后被泄露，<strong>过去的通信内容仍然安全</strong>——因为每次会话使用<strong>临时的会话密钥</strong>，不依赖长期密钥加密通信数据。</p>
          <ul>
            <li>每次连接协商新的<strong>临时密钥</strong>（如 Diffie-Hellman 临时交换）</li>
            <li>会话结束后销毁临时密钥</li>
            <li>攻击者获取长期私钥也无法解密历史会话</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>SSH 协议栈具备前向保密性（PPT 标注 *）；与 RSA 密钥传输模式对比——临时密钥是核心。</div>
        `
      },
      {
        id: "6-4",
        title: "心跳协议（Heartbeat Protocol）",
        tags: ["重点", "简答"],
        content: `
          <p><strong>心跳</strong>是由硬件或软件产生的周期性信号，指示正常操作或同步系统其他部分。</p>
          <h4>心跳协议</h4>
          <ul>
            <li>用于<strong>监视协议实体的可用性</strong></li>
            <li>运行在 <strong>TLS 记录协议之上</strong></li>
            <li>由两种消息类型组成：
              <ul>
                <li><strong>心跳请求</strong>：可在任何时候发出</li>
                <li><strong>心跳响应</strong>：对请求的应答</li>
              </ul>
            </li>
            <li>在握手协议<strong>第一阶段</strong>中建立，每个实体指示是否支持心跳</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>心跳协议运行在 TLS 记录协议之上；用于检测连接存活。注意：Heartbleed 漏洞即出在此协议实现中。</div>
        `
      }
    ]
  },
  {
    id: "ch7",
    title: "第七章 无线与邮件安全",
    questions: [
      {
        id: "7-1",
        title: "IEEE 802.11i 无线局域网安全（WEP/WPA/RSN）",
        tags: ["重点", "简答", "对比", "常考"],
        content: `
          <p>无线通信可在范围内被任何无线电监测，<strong>不需要物理连接</strong>，因此安全尤为重要。</p>
          <table class="compare-table">
            <tr><th>标准/协议</th><th>说明</th><th>安全性</th></tr>
            <tr>
              <td><strong>WEP</strong>（有线等效保密）</td>
              <td>802.11 最初定义的私密性协议</td>
              <td><strong>严重弱点</strong>，已被攻破，不应使用</td>
            </tr>
            <tr>
              <td><strong>WPA</strong></td>
              <td>Wi-Fi 网络安全存取，发布为 Wi-Fi 标准</td>
              <td>过渡方案，优于 WEP</td>
            </tr>
            <tr>
              <td><strong>802.11i / RSN</strong></td>
              <td>健壮安全网络（Robust Security Network），802.11i 最终形式</td>
              <td>当前推荐标准，定义多种 RSN 服务</td>
            </tr>
          </table>
          <h4>演进路线</h4>
          <p>WEP（有严重缺陷）→ WPA（过渡）→ 802.11i RSN（最终标准）</p>
          <div class="tip-box"><strong>💡 考点：</strong>WEP 有严重弱点；802.11i 的 RSN 是最终解决方案；WPA 是 Wi-Fi 联盟过渡标准。</div>
        `
      },
      {
        id: "7-2",
        title: "互联网邮件协议：SMTP、POP3、IMAP",
        tags: ["常考", "对比"],
        content: `
          <h4>邮件体系架构</h4>
          <p>传输邮件时使用两种电子邮件协议：</p>
          <table class="compare-table">
            <tr><th>协议</th><th>角色</th><th>功能</th></tr>
            <tr>
              <td><strong>SMTP</strong>（简单邮件传输协议）</td>
              <td>传输协议</td>
              <td>把消息通过互联网从<strong>源移动到目的地</strong>；基于文本的客户端-服务器协议</td>
            </tr>
            <tr>
              <td><strong>POP3</strong>（邮局协议）</td>
              <td>邮件访问协议</td>
              <td>允许邮件客户端（用户代理）从邮件服务器（MTA）<strong>下载</strong>邮件</td>
            </tr>
            <tr>
              <td><strong>IMAP</strong>（网络邮件访问协议）</td>
              <td>邮件访问协议</td>
              <td>让电子邮件客户在邮件服务器上<strong>访问/管理</strong>邮件（不必全部下载）</td>
            </tr>
          </table>
          <div class="tip-box"><strong>记忆：</strong>SMTP 负责「送」，POP3/IMAP 负责「取」；POP3 下载到本地，IMAP 服务器端管理。</div>
        `
      },
      {
        id: "7-3",
        title: "S/MIME 数字信封",
        tags: ["重点", "简答", "常考"],
        content: `
          <p>S/MIME 通过<strong>「数字信封」</strong>提供机密性，结合<strong>对称加密</strong>（AES）与<strong>公钥加密</strong>（RSA）的优点。</p>
          <h4>发送方 B 加密明文 M 生成密文 C 的过程</h4>
          <ol>
            <li>生成一条消息和一个随机的 <strong>128 比特</strong>数字，仅用作此消息的<strong>内容加密密钥 k</strong></li>
            <li>用内容加密密钥 k 对消息 M 进行<strong>对称加密</strong>（AES）</li>
            <li>用接收方 A 的<strong>公钥</strong>和 RSA 加密内容加密密钥 k，附加到邮件中</li>
            <li>发送密文 C（含加密消息 + 加密的 k）</li>
          </ol>
          <h4>接收方 A 解密恢复明文 M 的过程</h4>
          <ol>
            <li>用 RSA 及自己的<strong>私钥</strong>解密，恢复内容加密密钥 k</li>
            <li>用内容加密密钥 k 解密消息，得到明文 M</li>
          </ol>
          <h4>数字信封的特色（对比普通公钥加密）</h4>
          <ul>
            <li>大量数据用<strong>快速对称算法</strong>（AES）加密，仅小密钥用 RSA 加密</li>
            <li>兼顾<strong>效率</strong>（对称加密快）与<strong>密钥分发安全</strong>（RSA 保护会话密钥）</li>
            <li>每条消息使用<strong>独立的随机密钥</strong>，一次一密</li>
          </ul>
        `
      },
      {
        id: "7-4",
        title: "DKIM（域名密钥识别邮件）",
        tags: ["重点", "简答", "对比"],
        content: `
          <p><strong>DKIM</strong>（DomainKeys Identified Mail）提供对终端用户<strong>透明</strong>的 E-mail <strong>认证</strong>技术。</p>
          <h4>工作原理</h4>
          <ul>
            <li>用户的 E-mail 消息被<strong>管理域中的私钥签名</strong></li>
            <li>签名包括消息的<strong>所有内容</strong>以及部分 <strong>RFC 5322 消息头</strong></li>
          </ul>
          <h4>DKIM vs S/MIME</h4>
          <table class="compare-table">
            <tr><th>对比项</th><th>DKIM</th><th>S/MIME</th></tr>
            <tr><td>签名范围</td><td>消息内容 + RFC 5322 头（含来源信息）</td><td>仅对<strong>消息内容</strong>签名</td></tr>
            <tr><td>签名主体</td><td>邮件<strong>管理域</strong>（域名级别）</td><td>个人用户</td></tr>
            <tr><td>主要功能</td><td>邮件<strong>认证</strong>（验证来源域）</td><td>机密性 + 完整性 + 认证</td></tr>
            <tr><td>用户感知</td><td>对终端用户透明</td><td>用户需配置证书</td></tr>
          </table>
          <div class="tip-box"><strong>💡 考点：</strong>DKIM 保留来源头信息（S/MIME 会丢失 RFC 5322 来源头）；功能流程见教材 P217 图 8.11。</div>
        `
      }
    ]
  },
  {
    id: "ch8",
    title: "第八章 网络层安全",
    questions: [
      {
        id: "8-1",
        title: "IPSec 概述",
        tags: ["重点", "简答", "常考"],
        content: `
          <p><strong>IPSec</strong> 通过 <strong>IP 层</strong>提供安全，适用于 IPv4 和 IPv6。</p>
          <h4>核心优势</h4>
          <ul>
            <li>组织不但能保证在<strong>应用层</strong>有安全机制，而且能保证在<strong>没有应用层安全机制时，网络也是安全的</strong></li>
            <li>对上层应用<strong>透明</strong>，所有 IP 流量均可受保护</li>
            <li>提供<strong>机密性、完整性、认证、抗重放</strong>等安全服务</li>
          </ul>
          <h4>IPSec 两大协议</h4>
          <ul>
            <li><strong>AH</strong>（Authentication Header）：认证头，提供完整性验证和源认证</li>
            <li><strong>ESP</strong>（Encapsulating Security Payload）：封装安全载荷，提供加密 + 认证</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>IPSec 工作在网络层（IP 层），与 TLS（传输层）、HTTPS（应用层）层次不同。</div>
        `
      },
      {
        id: "8-2",
        title: "ESP 和 AH 的隧道模式与传输模式",
        tags: ["重点", "简答", "对比", "常考"],
        content: `
          <h4>两种封装模式</h4>
          <table class="compare-table">
            <tr><th>模式</th><th>封装方式</th><th>应用场景</th></tr>
            <tr>
              <td><strong>传输模式</strong></td>
              <td>仅对原始 IP 报文的<strong>载荷（数据）</strong>进行 AH/ESP 处理，<strong>原始 IP 头保留</strong></td>
              <td><strong>主机到主机</strong>通信（端到端）</td>
            </tr>
            <tr>
              <td><strong>隧道模式</strong></td>
              <td>在 AH/ESP 处理之后<strong>再封装一个外网 IP 头</strong></td>
              <td><strong>站点到站点</strong>（Site-to-Site VPN）</td>
            </tr>
          </table>
          <div class="example-box"><pre>
传输模式：
  [原 IP 头] [AH/ESP 头] [加密/认证的数据] [ESP 尾]
  ↑ IP 头不变，仅保护载荷

隧道模式：
  [新 IP 头] [AH/ESP 头] [原 IP 头 + 数据] [ESP 尾]
  ↑ 整个原 IP 包被封装在新的 IP 包中
          </pre></div>
          <div class="tip-box"><strong>💡 考点：</strong>隧道模式多一个外网 IP 头；传输模式用于主机间，隧道模式用于站点间 VPN。</div>
        `
      },
      {
        id: "8-3",
        title: "安全关联 SA、SPD 与 SAD",
        tags: ["重点", "简答", "常考"],
        content: `
          <h4>安全关联（SA）</h4>
          <p>SA 是发送端和接收端之间用于对传递的数据流提供安全服务的<strong>单向逻辑连接</strong>。双向通信需要<strong>两个 SA</strong>（每个方向一个）。</p>
          <h4>两个关键数据库</h4>
          <table class="compare-table">
            <tr><th>数据库</th><th>全称</th><th>作用</th></tr>
            <tr>
              <td><strong>SPD</strong></td>
              <td>Security Policy Database（安全策略数据库）</td>
              <td>定义<strong>哪些数据流</strong>需要 IPSec 保护、使用何种安全服务（AH/ESP、传输/隧道模式等）</td>
            </tr>
            <tr>
              <td><strong>SAD</strong></td>
              <td>Security Association Database（安全关联数据库）</td>
              <td>存储每个 SA 的<strong>具体参数</strong>（SPI、加密算法、密钥、模式、生存期等）</td>
            </tr>
          </table>
          <h4>工作流程</h4>
          <ul>
            <li>数据包到达 → 查 <strong>SPD</strong> 确定安全策略</li>
            <li>若需 IPSec → 查 <strong>SAD</strong> 获取对应 SA 参数</li>
            <li>按 SA 参数进行 AH/ESP 封装处理</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>SA 是单向的；SPD 定策略，SAD 存参数；SPI（安全参数索引）用于标识 SA。</div>
        `
      }
    ]
  },
  {
    id: "ch9",
    title: "第九章 密码学考核重点（本课 PPT）",
    questions: [
      {
        id: "9-1",
        title: "DES 与 AES 参数对比",
        tags: ["重点", "常考", "对比"],
        content: `
          <table class="compare-table">
            <tr><th>参数</th><th>DES</th><th>AES</th></tr>
            <tr><td>分组明文块大小（bits）</td><td><strong>64</strong></td><td><strong>128</strong></td></tr>
            <tr><td>加密密钥长度（bits）</td><td><strong>56</strong>（有效长度，64 位含 8 位奇偶校验）</td><td><strong>128 / 192 / 256</strong></td></tr>
            <tr><td>密文长度（bits）</td><td><strong>64</strong></td><td><strong>128</strong></td></tr>
          </table>
          <h4>DES 结构</h4>
          <p>DES 采用 <strong>Feistel 密码</strong>结构，16 轮迭代，每轮使用子密钥 K1, K2, …, K16。</p>
          <h4>AES 特点</h4>
          <ul>
            <li>分组长度固定 128 位，密钥长度可选 128/192/256 位</li>
            <li>非 Feistel 结构，采用代换-置换网络（SPN）</li>
            <li>轮数随密钥长度变化：10/12/14 轮</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>直接填表——DES 64-56-64，AES 128-128/192/256-128；DES 有效密钥仅 56 位。</div>
        `
      },
      {
        id: "9-2",
        title: "RC4 密钥调度与加密流程",
        tags: ["重点", "简答", "常考"],
        content: `
          <p>RC4 是 Ron Rivest 设计的<strong>密钥大小可变</strong>的流密码，使用面向字节操作，广泛应用于 SSL/TLS、WEP/WPA。</p>
          <h4>（1）用对称密钥 K 生成 256 字节状态向量 T</h4>
          <div class="example-box"><pre>
for i = 0 to 255 do
    T[i] = K[i mod keylen];  // keylen 为密钥 K 的字节数
          </pre></div>
          <h4>（2）初始化状态向量 S（密钥调度 / KSA）</h4>
          <div class="example-box"><pre>
for i = 0 to 255 do S[i] = i;          // S 按升序置 0,1,…,255
for i = 0 to 255 do T[i] = K[i mod keylen];
j = 0
for i = 0 to 255 do
    j = (j + S[i] + T[i]) mod 256;
    swap(S[i], S[j]);                    // 高质量洗牌
          </pre></div>
          <h4>（3）利用洗牌后的 S 生成密钥流并加密（PRGA）</h4>
          <div class="example-box"><pre>
i = j = 0;
for each message byte Mi do
    i = (i + 1) mod 256;
    j = (j + S[i]) mod 256;
    swap(S[i], S[j]);
    t = (S[i] + S[j]) mod 256;
    Ci = Mi XOR S[t];                    // 密钥流字节与明文异或
          </pre></div>
          <h4>RC4 相关考题：密钥流重用检测</h4>
          <p>Alice 和 Bob 使用 128 比特固定密钥 k，每次选 80 比特随机值 v，发送 (v||c)，其中 c = RC4(v||k) ⊕ m。</p>
          <ul>
            <li><strong>（1）检测方法</strong>：若两次传输的 v 相同，则 RC4(v||k) 产生<strong>相同密钥流</strong>。攻击者计算 c1 ⊕ c2 = m1 ⊕ m2，若明文有已知格式（如英文），可恢复明文</li>
            <li><strong>（2）修正</strong>：每次使用<strong>不同的 v</strong>（nonce），确保密钥流不重复；更好的方案是使用标准 AEAD 协议</li>
          </ul>
        `
      },
      {
        id: "9-3",
        title: "哈希函数（单向散列函数）",
        tags: ["重点", "简答"],
        content: `
          <p><strong>哈希函数</strong>（Hash / 单向散列函数）的基本思想：</p>
          <ul>
            <li>输入<strong>任意长度</strong>的消息 M</li>
            <li>产生<strong>固定长度</strong> m 的散列值 h</li>
            <li>即：h = H(M)</li>
          </ul>
          <h4>哈希函数应满足的性质</h4>
          <table class="compare-table">
            <tr><th>性质</th><th>含义</th></tr>
            <tr><td>单向性</td><td>给定 h，计算上不可行找到 M 使 H(M) = h</td></tr>
            <tr><td>抗弱碰撞</td><td>给定 M，计算上不可行找到 M' ≠ M 使 H(M) = H(M')</td></tr>
            <tr><td>抗强碰撞</td><td>计算上不可行找到任意 M ≠ M' 使 H(M) = H(M')</td></tr>
          </table>
          <h4>典型应用</h4>
          <ul>
            <li>消息完整性验证（数字签名前先哈希）</li>
            <li>口令存储（存储哈希值而非明文）</li>
            <li>数字指纹</li>
          </ul>
          <div class="tip-box"><strong>💡 考点：</strong>哈希函数是单向的、定长输出；与加密不同，哈希是<strong>不可逆</strong>的。</div>
        `
      },
      {
        id: "9-4",
        title: "RSA 安全性与计算",
        tags: ["重点", "简答", "常考"],
        content: `
          <h4>RSA 安全性基础</h4>
          <p>RSA 密码体制的安全性基于<strong>大整数分解困难问题</strong>——已知 n = pq，分解 n 求 p、q 在计算上不可行。</p>
          <h4>RSA 密钥生成与加解密</h4>
          <ol>
            <li>选素数 p, q → 计算 n = pq，φ(n) = (p−1)(q−1)</li>
            <li>选 e，满足 gcd(e, φ(n)) = 1</li>
            <li>求 d，使 ed ≡ 1 (mod φ(n))</li>
            <li>加密：C = M<sup>e</sup> mod n；解密：M = C<sup>d</sup> mod n</li>
          </ol>
          <h4>计算例题</h4>
          <div class="example-box"><pre>
【例 1】n = 35 = 5×7，e = 3，C = 10，求 M
  φ(n) = (5−1)(7−1) = 24
  3d ≡ 1 (mod 24) → d = 5
  M = C^d mod n = 10^5 mod 35 = 5
  验证：C = M^e mod n = 5^3 mod 35 = 10 ✓

【例 2】n = 3599 = 59×61，e = 31，求 d
  φ(n) = 58×60 = 3480
  31d ≡ 1 (mod 3480) → d = 3031（扩展欧几里得算法）
          </pre></div>
          <div class="tip-box"><strong>💡 考点：</strong>安全性 = 大整数分解难；求 d 用扩展欧几里得算法；注意 0 &lt; d &lt; φ(n)。</div>
        `
      }
    ]
  }
];
