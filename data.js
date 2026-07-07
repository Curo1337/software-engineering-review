/* 软件工程总复习 - 详细解析数据 */
const REVIEW_DATA = [
  {
    id: "ch1",
    title: "第一章 软件工程概述",
    questions: [
      {
        id: "1-1",
        title: "软件是什么？软件及软件开发的特点是什么？",
        tags: ["基础概念", "常考"],
        content: `
          <h4>软件的定义</h4>
          <p><strong>软件</strong>是计算机系统中与硬件相互依存的<strong>另一部分</strong>，包括：</p>
          <ul>
            <li><strong>程序</strong>：按特定顺序组织的计算机指令序列</li>
            <li><strong>数据</strong>：程序能正常操纵信息的数据结构</li>
            <li><strong>文档</strong>：与程序开发、维护和使用有关的图文材料</li>
          </ul>
          <h4>软件的特点（6 个，必背）</h4>
          <table class="compare-table">
            <tr><th>特点</th><th>详细说明</th></tr>
            <tr><td>① 复杂性</td><td>逻辑复杂，状态组合多，人类智力难以完全掌握</td></tr>
            <tr><td>② 不可见性</td><td>逻辑产品，开发进度和质量难以直观衡量</td></tr>
            <tr><td>③ 易变性</td><td>需求变化频繁，软件需不断修改</td></tr>
            <tr><td>④ 没有磨损</td><td>不会像硬件那样因使用而磨损，但会因修改引入错误而"退化"</td></tr>
            <tr><td>⑤ 复制容易</td><td>生产主要是复制，成本集中在开发而非制造</td></tr>
            <tr><td>⑥ 开发是智力活动</td><td>以人为主，自动化程度低，受开发者经验影响大</td></tr>
          </table>
        `
      },
      {
        id: "1-2",
        title: "软件危机是什么？表现、原因与本质",
        tags: ["重点", "简答"],
        content: `
          <h4>软件危机的定义</h4>
          <p>在计算机软件开发与维护过程中遇到的一系列<strong>严重问题</strong>，表现为：成本高、进度慢、质量低、维护难、文档缺等。</p>
          <h4>软件危机的表现（6 条）</h4>
          <ol>
            <li>对软件开发成本和进度估计常常很不准确</li>
            <li>用户对"已完成"系统不满意的现象经常发生</li>
            <li>软件产品的质量往往靠不住</li>
            <li>软件常常是不可维护的</li>
            <li>软件通常没有适当的文档资料</li>
            <li>软件成本在总成本中比例逐年上升</li>
          </ol>
          <h4>产生软件危机的主要原因</h4>
          <ul>
            <li><strong>客观原因</strong>：软件规模越来越大、复杂性急剧增加</li>
            <li><strong>主观原因</strong>：忽视软件质量、缺乏正确方法、错误的管理方式</li>
            <li>具体：无需求分析、无设计过程、无文档、无质量保证、无软件工程管理</li>
          </ul>
          <div class="tip-box"><strong>💡 本质：</strong>软件危机的<strong>本质</strong>是：软件<strong>生产</strong>的<strong>复杂性</strong>与<strong>软件生产</strong>的<strong>落后性</strong>（方法、工具、管理落后）之间的矛盾。</div>
        `
      },
      {
        id: "1-3",
        title: "软件工程的定义",
        tags: ["基础"],
        content: `
          <blockquote>软件工程是指导计算机软件<strong>开发</strong>和<strong>维护</strong>的一门<strong>工程学科</strong>。采用<strong>工程的概念、原理、技术和方法</strong>来开发与维护软件，把经过时间考验而证明正确的管理技术和当前能够得到的最好的技术方法结合起来。</blockquote>
          <p>关键词：<strong>工程化方法</strong> + <strong>开发</strong> + <strong>维护</strong></p>
        `
      },
      {
        id: "1-4",
        title: "软件包含什么？程序、数据、文档",
        tags: ["填空"],
        content: `
          <p>软件 = <strong>程序</strong> + <strong>数据</strong> + <strong>文档</strong></p>
          <ul>
            <li><strong>程序</strong>：按事先设计的功能和性能要求执行的指令序列</li>
            <li><strong>数据</strong>：程序能正常操纵信息的数据结构</li>
            <li><strong>文档</strong>：与程序开发、维护和使用有关的图文材料（需求规格说明、设计说明、用户手册等）</li>
          </ul>
          <div class="warn-box">⚠️ 注意：没有文档的软件不能称为完整的软件产品。</div>
        `
      },
      {
        id: "1-5",
        title: "软件工程的三要素：过程、方法、工具",
        tags: ["填空", "常考"],
        content: `
          <table class="compare-table">
            <tr><th>要素</th><th>含义</th><th>举例</th></tr>
            <tr><td><strong>过程</strong></td><td>为获得高质量软件所需要完成的一系列任务及工作步骤</td><td>瀑布模型、增量模型、螺旋模型</td></tr>
            <tr><td><strong>方法</strong></td><td>完成软件开发各项任务的技术方法</td><td>结构化方法、面向对象方法</td></tr>
            <tr><td><strong>工具</strong></td><td>运用方法完成软件开发所使用/support 的工具</td><td>CASE 工具、编译器、测试工具</td></tr>
          </table>
          <p>关系：在<strong>过程</strong>指导下，运用<strong>方法</strong>和<strong>工具</strong>来开发软件。</p>
        `
      },
      {
        id: "1-6",
        title: "软件生命周期：三个时期、八个阶段",
        tags: ["重点", "简答", "填空"],
        content: `
          <h4>软件生命周期</h4>
          <p>软件从<strong>提出</strong>到<strong>废弃</strong>的整个生存过程。</p>
          <h4>三个时期 → 八个阶段</h4>
          <table class="compare-table">
            <tr><th>时期</th><th>阶段</th><th>主要任务</th><th>阶段性成果</th></tr>
            <tr><td rowspan="2"><strong>软件定义</strong></td><td>① 问题定义</td><td>明确要解决的问题是什么</td><td>问题定义报告</td></tr>
            <tr><td>② 可行性研究</td><td>确定项目是否值得做</td><td>可行性研究报告</td></tr>
            <tr><td rowspan="2"><strong>软件开发</strong></td><td>③ 需求分析</td><td>确定系统必须做什么</td><td>需求规格说明书</td></tr>
            <tr><td>④ 总体设计</td><td>确定系统怎么做（宏观结构）</td><td>概要设计说明书</td></tr>
            <tr><td></td><td>⑤ 详细设计</td><td>确定具体算法和数据结构</td><td>详细设计说明书</td></tr>
            <tr><td></td><td>⑥ 编码</td><td>编写程序代码</td><td>源程序清单</td></tr>
            <tr><td></td><td>⑦ 测试</td><td>发现错误、验证功能</td><td>测试报告</td></tr>
            <tr><td><strong>软件维护</strong></td><td>⑧ 维护</td><td>改正错误、适应变化、完善功能</td><td>维护记录、新版本</td></tr>
          </table>
          <div class="tip-box"><strong>记忆口诀：</strong>定义（问题+可行）→ 开发（需求+概要+详细+编码+测试）→ 维护</div>
        `
      },
      {
        id: "1-7",
        title: "软件工程学研究内容与目标",
        tags: ["简答"],
        content: `
          <h4>研究内容（两大方面）</h4>
          <ol>
            <li><strong>软件开发技术</strong>：需求分析、设计、编码、测试、维护等技术与方法</li>
            <li><strong>软件工程管理</strong>：进度、成本、质量、人员、配置管理等</li>
          </ol>
          <h4>软件工程的目标</h4>
          <p>开发<strong>低成本</strong>、<strong>高质量</strong>、满足用户需求的软件产品，并提高软件开发的<strong>生产率</strong>和<strong>可维护性</strong>。</p>
          <p>具体目标：易维护性、可靠性、可理解性、效率、可用性、可移植性等。</p>
        `
      },
      {
        id: "1-8",
        title: "软件工程的七条基本原理",
        tags: ["简答", "填空"],
        content: `
          <ol>
            <li><strong>用分阶段的生命周期计划严格管理</strong> — 把软件生命周期划分为若干阶段，严格按阶段进行</li>
            <li><strong>坚持进行阶段评审</strong> — 每个阶段结束前进行严格评审</li>
            <li><strong>实行严格的产品控制</strong> — 需求变更需经正式程序批准</li>
            <li><strong>采用现代程序设计技术</strong> — 结构化、面向对象等</li>
            <li><strong>结果应能清楚地审查</strong> — 每个阶段都有明确的文档产出</li>
            <li><strong>开发小组的人员应该少而精</strong> — 人员数量与项目规模匹配</li>
            <li><strong>承认不断改进软件工程实践的必要性</strong> — 持续改进方法和过程</li>
          </ol>
        `
      },
      {
        id: "1-9",
        title: "瀑布模型和快速原型模型的思想",
        tags: ["重点", "对比"],
        content: `
          <h4>瀑布模型</h4>
          <ul>
            <li><strong>思想</strong>：按软件生命周期各阶段<strong>顺序</strong>进行，前一阶段完成后才进入下一阶段</li>
            <li><strong>特点</strong>：阶段间有<strong>文档</strong>传递和<strong>评审</strong>，强调计划性和文档驱动</li>
            <li><strong>优点</strong>：过程清晰、文档完整、便于管理</li>
            <li><strong>缺点</strong>：缺乏灵活性，用户只能在最后看到产品，需求变化代价大</li>
          </ul>
          <h4>快速原型模型</h4>
          <ul>
            <li><strong>思想</strong>：快速构建一个<strong>可运行的原型</strong>，让用户试用并反馈，逐步完善需求</li>
            <li><strong>目的</strong>：确定用户的<strong>真实需求</strong></li>
            <li><strong>步骤</strong>：快速原型 → 用户评估 → 修改原型 → 再评估 → … → 确定需求 → 正式开发</li>
            <li><strong>优点</strong>：有效确定需求，减少返工</li>
            <li><strong>缺点</strong>：原型可能被误当作最终产品；快速开发可能忽视质量</li>
          </ul>
        `
      },
      {
        id: "1-10",
        title: "CASE、软件配置、测试配置、基线、回归测试",
        tags: ["概念", "填空"],
        content: `
          <ul>
            <li><strong>CASE</strong>（Computer-Aided Software Engineering）：计算机辅助软件工程，用软件工具支持软件开发全过程</li>
            <li><strong>软件配置</strong>：软件在特定时刻的<strong>整体状态</strong>，包括所有文档、数据、程序及其版本</li>
            <li><strong>测试配置</strong>：用于测试的软件配置，包括测试计划、测试用例、测试数据等</li>
            <li><strong>基线（Baseline）</strong>：通过<strong>正式评审</strong>后形成的、可作为<strong>进一步开发基础</strong>的<strong>稳定版本</strong>。基线一旦建立，变更需走正式变更控制程序</li>
            <li><strong>回归测试</strong>：修改软件后，<strong>重新执行</strong>已有测试用例，确保修改没有引入新错误或破坏原有功能</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "ch2",
    title: "第二章 可行性研究",
    questions: [
      {
        id: "2-1",
        title: "可行性研究的任务和目的",
        tags: ["简答"],
        content: `
          <h4>目的</h4>
          <p>用<strong>最小的代价</strong>、在<strong>尽可能短的时间</strong>内，确定<strong>是否值得</strong>进行该项软件开发项目。</p>
          <h4>任务</h4>
          <ol>
            <li>进一步分析和澄清问题定义</li>
            <li>分析在<strong>技术、经济、操作</strong>等方面是否可行</li>
            <li>写出<strong>可行性研究报告</strong></li>
            <li>为后续开发提供决策依据</li>
          </ol>
          <div class="tip-box">可行性研究<strong>不是</strong>解决具体技术问题，而是<strong>决策</strong>项目是否值得投资开发。</div>
        `
      },
      {
        id: "2-2",
        title: "可行性研究的三个方面：技术、操作、经济",
        tags: ["重点", "简答"],
        content: `
          <table class="compare-table">
            <tr><th>类型</th><th>考察内容</th><th>关键问题</th></tr>
            <tr><td><strong>技术可行性</strong></td><td>现有技术能否实现系统功能</td><td>技术风险、开发方法、开发人员能力、技术资源是否足够</td></tr>
            <tr><td><strong>经济可行性</strong></td><td>开发成本和效益分析</td><td>投资回报率、成本效益比、能否在预算内完成、是否有经济效益</td></tr>
            <tr><td><strong>操作可行性</strong></td><td>系统运行和维护是否可行</td><td>用户能否接受、操作方式是否合理、组织管理是否支持</td></tr>
          </table>
          <p>有时还包括<strong>法律可行性</strong>（版权、专利、合同等）和<strong>社会可行性</strong>（道德、社会影响）。</p>
        `
      },
      {
        id: "2-3",
        title: "数据流图 DFD：成分、符号、画法",
        tags: ["应用题", "重点"],
        content: `
          <h4>DFD 的四种基本成分</h4>
          <table class="compare-table">
            <tr><th>符号</th><th>名称</th><th>含义</th></tr>
            <tr><td>□ 或 外部实体</td><td><strong>源点/终点</strong>（外部实体）</td><td>系统外部与系统交互的人或组织，是数据的来源或去向</td></tr>
            <tr><td>○ 圆</td><td><strong>加工</strong>（处理/变换）</td><td>对数据进行加工处理的功能单元，必须有输入和输出</td></tr>
            <tr><td>→ 箭头</td><td><strong>数据流</strong></td><td>数据在系统各成分间的流动方向，必须有名字</td></tr>
            <tr><td>═ 双横线</td><td><strong>数据存储</strong>（文件）</td><td>数据的静态存储，如数据库、文件</td></tr>
          </table>
          <h4>DFD 绘制规则</h4>
          <ol>
            <li>自顶向下、逐层分解（顶层图 → 0 层图 → 1 层图…）</li>
            <li>加工至少有一个输入和一个输出</li>
            <li>数据流不能从加工直接到加工（需经数据存储或外部实体）</li>
            <li>命名：加工用动词短语，数据流/存储用名词</li>
            <li>平衡：子图与父图输入输出必须一致</li>
          </ol>
          <div class="example-box">
            <strong>示例：</strong>图书管理系统顶层 DFD<br>
            读者 → [借书处理] → 图书库存<br>
            管理员 → [还书处理] → 借阅记录
          </div>
        `
      },
      {
        id: "2-4",
        title: "数据字典的内容和定义方法",
        tags: ["简答"],
        content: `
          <h4>数据字典（DD）的作用</h4>
          <p>对 DFD 中出现的<strong>所有数据元素</strong>进行<strong>精确定义和描述</strong>，消除二义性，是需求分析的重要工具。</p>
          <h4>数据字典包含的内容</h4>
          <ul>
            <li><strong>数据流</strong>的定义</li>
            <li><strong>数据存储</strong>的定义</li>
            <li><strong>数据项</strong>（数据元素）的定义</li>
            <li><strong>加工</strong>的说明（IPO 图、PDL 等）</li>
          </ul>
          <h4>定义方法</h4>
          <ul>
            <li><strong>顺序</strong>：= 由…组成（A = B + C）</li>
            <li><strong>选择</strong>：| 或（A = B | C）</li>
            <li><strong>重复</strong>：{ } 或 *（A = {B}）</li>
            <li><strong>可选</strong>：[ ]（A = [B]）</li>
          </ul>
          <div class="example-box">
            <strong>示例：</strong>发票 = 发票编号 + 商品名称 + 数量 + 单价 + 金额<br>
            金额 = 数量 × 单价
          </div>
        `
      },
      {
        id: "2-5",
        title: "成本效益分析与成本估计",
        tags: ["简答"],
        content: `
          <h4>成本效益分析</h4>
          <p>从<strong>经济角度</strong>评估项目是否值得开发，比较<strong>开发成本</strong>与<strong>预期效益</strong>。</p>
          <h4>常用方法</h4>
          <ul>
            <li><strong>货币的时间价值</strong>：将未来收益折算为现值（贴现）</li>
            <li><strong>投资回收期</strong>：收回投资所需时间，越短越好</li>
            <li><strong>效益分析</strong>：直接效益（收入增加）+ 间接效益（效率提升）</li>
          </ul>
          <h4>成本估计技术</h4>
          <ul>
            <li><strong>代码行技术</strong>：估算代码行数 × 每行成本</li>
            <li><strong>任务分解</strong>：将项目分解为子任务，分别估计</li>
            <li><strong>经验模型</strong>：如 COCOMO 模型</li>
          </ul>
        `
      },
      {
        id: "2-6",
        title: "系统流程图描述什么",
        tags: ["概念"],
        content: `
          <p><strong>系统流程图</strong>用于描述<strong>物理系统</strong>中<strong>数据在各部门/人员/设备之间的流动和处理过程</strong>，反映的是<strong>实际业务流程</strong>和<strong>物理数据流</strong>。</p>
          <div class="tip-box">
            <strong>与 DFD 的区别：</strong><br>
            • DFD：逻辑模型，描述<strong>做什么</strong>（功能）<br>
            • 系统流程图：物理模型，描述<strong>怎么做</strong>（具体设备、人员、表单）
          </div>
        `
      }
    ]
  },
  {
    id: "ch3",
    title: "第三章 需求分析",
    questions: [
      {
        id: "3-1",
        title: "需求分析应建立的三种模型及图形工具",
        tags: ["重点", "填空"],
        content: `
          <table class="compare-table">
            <tr><th>模型</th><th>描述内容</th><th>图形工具</th></tr>
            <tr><td><strong>数据模型</strong></td><td>系统处理的对象及其关系</td><td><strong>ER 图</strong>（实体-联系图）、数据字典</td></tr>
            <tr><td><strong>功能模型</strong></td><td>系统功能及数据流</td><td><strong>数据流图 DFD</strong></td></tr>
            <tr><td><strong>行为模型</strong></td><td>系统状态及状态转换</td><td><strong>状态图</strong>、状态转换图</td></tr>
          </table>
          <p>补充工具：<strong>层次图</strong>（系统结构）、<strong>IPO 图</strong>（输入-处理-输出）、<strong>用例图</strong>（OO 方法）</p>
        `
      },
      {
        id: "3-2",
        title: "需求分析工作的三个阶段",
        tags: ["填空"],
        content: `
          <ol>
            <li><strong>问题识别和分析</strong>：与用户沟通，理解问题，确定需求</li>
            <li><strong>需求规格说明</strong>：用规范文档和模型描述需求（需求规格说明书）</li>
            <li><strong>需求验证/评审</strong>：检查需求是否正确、完整、一致、可追踪</li>
          </ol>
        `
      },
      {
        id: "3-3",
        title: "需求分析回答什么问题？任务是什么？",
        tags: ["简答"],
        content: `
          <h4>回答的核心问题</h4>
          <p><strong>"系统必须做什么？"</strong>（What，而非 How）</p>
          <h4>主要任务</h4>
          <ol>
            <li>确定用户对软件系统的<strong>功能、性能、可靠性、安全性</strong>等需求</li>
            <li>分析系统的<strong>数据要求</strong>和处理逻辑</li>
            <li>建立<strong>数据模型、功能模型、行为模型</strong></li>
            <li>编写<strong>需求规格说明书</strong></li>
            <li>与用户确认需求，进行<strong>需求评审</strong></li>
          </ol>
          <div class="warn-box">需求分析是<strong>软件定义</strong>阶段的最后一步，其成果是<strong>需求规格说明书</strong>，作为设计和测试的依据。</div>
        `
      },
      {
        id: "3-4",
        title: "ER 建模、状态图、层次图的意义",
        tags: ["应用题", "重点"],
        content: `
          <h4>ER 图（实体-联系图）</h4>
          <ul>
            <li><strong>作用</strong>：描述数据模型，表示实体及其之间的联系</li>
            <li><strong>成分</strong>：实体（矩形）、属性（椭圆）、联系（菱形）、联系类型（1:1, 1:N, M:N）</li>
            <li><strong>用途</strong>：数据库设计的基础</li>
          </ul>
          <h4>状态图（状态转换图）</h4>
          <ul>
            <li><strong>作用</strong>：描述行为模型，表示系统/对象的状态及状态间的转换条件</li>
            <li><strong>成分</strong>：状态（圆角矩形）、转换（箭头+事件/条件）、初态、终态</li>
            <li><strong>用途</strong>：描述系统对事件的响应行为</li>
          </ul>
          <h4>层次图（HIPO 的一部分）</h4>
          <ul>
            <li><strong>作用</strong>：表示系统的<strong>层次结构</strong>，模块间的调用关系</li>
            <li><strong>用途</strong>：概要设计阶段描述软件结构</li>
          </ul>
        `
      },
      {
        id: "3-5",
        title: "验证软件需求正确性的方面",
        tags: ["简答"],
        content: `
          <p>需求验证应从以下方面检查：</p>
          <ol>
            <li><strong>一致性</strong>：需求之间无矛盾</li>
            <li><strong>完整性</strong>：所有必要需求都已包含</li>
            <li><strong>现实性</strong>：需求在技术、经济上可实现</li>
            <li><strong>有效性</strong>：需求能解决问题，满足用户目标</li>
            <li><strong>可追踪性</strong>：需求可追溯到问题定义，后续设计可追溯到需求</li>
            <li><strong>无二义性</strong>：每个需求只有一种解释</li>
            <li><strong>可验证性</strong>：需求可通过测试验证</li>
          </ol>
        `
      }
    ]
  },
  {
    id: "ch5",
    title: "第五章 总体设计",
    questions: [
      {
        id: "5-1",
        title: "概要设计的任务和过程",
        tags: ["简答"],
        content: `
          <h4>任务</h4>
          <p>回答<strong>"系统怎么做？"</strong>（How），将需求转化为<strong>软件体系结构</strong>，确定程序模块划分及模块间关系。</p>
          <h4>主要工作</h4>
          <ol>
            <li>设计软件<strong>系统结构</strong>（模块划分、调用关系）</li>
            <li>设计<strong>数据结构</strong>及数据库</li>
            <li>编写<strong>概要设计说明书</strong></li>
            <li>制定<strong>测试计划</strong>（初步）</li>
          </ol>
          <h4>设计过程</h4>
          <p>需求分析 → 设计系统结构 → 设计数据结构 → 编写文档 → 评审</p>
        `
      },
      {
        id: "5-2",
        title: "结构化程序设计思想：自顶向下、逐步求精、单入口单出口",
        tags: ["重点"],
        content: `
          <ul>
            <li><strong>自顶向下</strong>：从总体功能出发，逐层分解为子功能，先整体后局部</li>
            <li><strong>逐步求精</strong>：每步细化都使设计更清晰，直到可编码实现</li>
            <li><strong>单入口单出口</strong>：每个模块/程序段只有一个入口和一个出口，便于理解和维护</li>
          </ul>
          <p>配合<strong>三种基本结构</strong>：顺序、选择、循环，避免 goto。</p>
        `
      },
      {
        id: "5-3",
        title: "模块作用域与控制域",
        tags: ["概念", "常考"],
        content: `
          <ul>
            <li><strong>控制域</strong>：模块本身 + 其<strong>所有下级模块</strong>（直接或间接调用的模块）</li>
            <li><strong>作用域</strong>：受该模块内<strong>判定影响</strong>的所有语句的范围</li>
          </ul>
          <div class="tip-box">
            <strong>好的设计原则：</strong>模块的<strong>作用域</strong>应<strong>在控制域之内</strong>。<br>
            即：判定影响的范围不应超出该模块及其下级模块，否则会增加模块间耦合，降低可维护性。
          </div>
        `
      },
      {
        id: "5-4",
        title: "模块独立、内聚与耦合",
        tags: ["重点", "简答", "应用"],
        content: `
          <h4>模块独立</h4>
          <p>模块间联系<strong>越少越好</strong>（低耦合），模块内部联系<strong>越紧密越好</strong>（高内聚）。</p>
          <h4>内聚（由高到低，越好→越差）</h4>
          <table class="compare-table">
            <tr><th>类型</th><th>说明</th><th>评价</th></tr>
            <tr><td>功能内聚</td><td>模块完成单一功能</td><td>★★★★★ 最好</td></tr>
            <tr><td>顺序内聚</td><td>输出作为下一处理输入</td><td>★★★★</td></tr>
            <tr><td>通信内聚</td><td>处理相同数据</td><td>★★★</td></tr>
            <tr><td>过程内聚</td><td>按特定次序执行</td><td>★★</td></tr>
            <tr><td>时间内聚</td><td>同时执行的任务</td><td>★</td></tr>
            <tr><td>逻辑内聚</td><td>逻辑相关但功能不同</td><td>差</td></tr>
            <tr><td>偶然内聚</td><td>无明确关系</td><td>最差</td></tr>
          </table>
          <h4>耦合（由低到高，越好→越差）</h4>
          <table class="compare-table">
            <tr><th>类型</th><th>说明</th><th>评价</th></tr>
            <tr><td>数据耦合</td><td>通过参数传递简单数据</td><td>★★★★★ 最好</td></tr>
            <tr><td>标记耦合</td><td>传递数据结构/记录</td><td>★★★★</td></tr>
            <tr><td>控制耦合</td><td>传递控制信息（标志、开关）</td><td>★★★</td></tr>
            <tr><td>外部耦合</td><td>共享外部数据/环境</td><td>★★</td></tr>
            <tr><td>公共耦合</td><td>共享公共数据区</td><td>★</td></tr>
            <tr><td>内容耦合</td><td>直接访问/修改对方内部</td><td>最差</td></tr>
          </table>
          <div class="tip-box"><strong>设计原则：</strong>追求<strong>高内聚、低耦合</strong>，优先功能内聚 + 数据耦合。</div>
        `
      },
      {
        id: "5-5",
        title: "如何根据函数声明判断耦合类型",
        tags: ["应用题"],
        content: `
          <h4>判断技巧</h4>
          <table class="compare-table">
            <tr><th>耦合类型</th><th>函数声明特征</th><th>示例</th></tr>
            <tr><td>数据耦合</td><td>传递基本类型参数（int, float, char）</td><td>void f(int x, float y)</td></tr>
            <tr><td>标记耦合</td><td>传递结构体、数组、记录</td><td>void f(Student s)</td></tr>
            <tr><td>控制耦合</td><td>传递控制标志、开关变量</td><td>void f(int flag) // flag 控制内部逻辑</td></tr>
            <tr><td>公共耦合</td><td>使用全局变量</td><td>extern int g; void f() { g=1; }</td></tr>
            <tr><td>内容耦合</td><td>直接访问其他模块内部数据/跳转</td><td>直接修改其他模块的私有变量</td></tr>
          </table>
          <div class="example-box">
            <strong>例题：</strong><br>
            void calc(int a, int b) → <strong>数据耦合</strong><br>
            void process(Record r) → <strong>标记耦合</strong><br>
            void handle(int mode) // mode 决定分支 → <strong>控制耦合</strong>
          </div>
        `
      },
      {
        id: "5-6",
        title: "七条启发式规则",
        tags: ["简答", "填空"],
        content: `
          <ol>
            <li><strong>改进模块独立性</strong> — 高内聚、低耦合</li>
            <li><strong>模块规模应该适中</strong> — 通常 50～100 行</li>
            <li><strong>深度、宽度、扇出、扇入都应适当</strong></li>
            <li><strong>模块的作用域应该在控制域之内</strong></li>
            <li><strong>力争降低模块接口的复杂程度</strong></li>
            <li><strong>设计单入口单出口的模块</strong></li>
            <li><strong>模块功能应该可以预测</strong> — 相同输入产生相同输出</li>
          </ol>
        `
      },
      {
        id: "5-7",
        title: "深度、宽度、扇入、扇出",
        tags: ["概念", "填空"],
        content: `
          <ul>
            <li><strong>深度</strong>：软件结构中<strong>从顶层模块到最低层模块</strong>的层数（纵向）</li>
            <li><strong>宽度</strong>：软件结构中<strong>同一层次上模块的总数</strong>（横向）</li>
            <li><strong>扇出</strong>：一个模块<strong>直接调用</strong>的下级模块数目</li>
            <li><strong>扇入</strong>：调用该模块的<strong>上级模块</strong>数目</li>
          </ul>
          <div class="tip-box">
            <strong>设计建议：</strong><br>
            • 扇出不宜过大（一般 3～7），过大则考虑增加中间层<br>
            • 扇入大说明模块复用性好，但不宜过大<br>
            • 深度与宽度需平衡，深度过大难理解，宽度过大结构松散
          </div>
        `
      },
      {
        id: "5-8",
        title: "层次图画法",
        tags: ["应用题"],
        content: `
          <p><strong>层次图</strong>用树形结构表示模块的<strong>层次调用关系</strong>：</p>
          <ul>
            <li>顶层：主控模块</li>
            <li>每条边：表示<strong>调用关系</strong>（上层调用下层）</li>
            <li>不含数据流，只表示结构</li>
          </ul>
          <div class="example-box">
            <pre>
        [主控]
       /  |  \\
   [A] [B] [C]
   / \\
[D] [E]
            </pre>
            主控调用 A、B、C；A 调用 D、E
          </div>
        `
      },
      {
        id: "5-9",
        title: "HIPO 图、结构图符号",
        tags: ["概念"],
        content: `
          <h4>HIPO 图 = 层次图 + IPO 图</h4>
          <ul>
            <li><strong>层次图（H 图）</strong>：模块层次结构</li>
            <li><strong>IPO 图</strong>：每个模块的 Input-Process-Output 说明</li>
          </ul>
          <h4>结构图符号</h4>
          <ul>
            <li>矩形：模块</li>
            <li>箭头：调用关系（调用者 → 被调用者）</li>
            <li>带空心圆箭头：数据传递</li>
            <li>带实心圆箭头：控制信息传递</li>
          </ul>
        `
      },
      {
        id: "5-10",
        title: "DFD 转化为体系结构图（方法一、二）",
        tags: ["应用题", "重点"],
        content: `
          <h4>变换型数据流</h4>
          <p>数据流呈<strong>输入 → 变换中心 → 输出</strong> 形式。</p>
          <p><strong>方法一（变换分析）：</strong></p>
          <ol>
            <li>识别<strong>变换中心</strong>、输入、输出</li>
            <li>设计顶层：输入模块 + 变换模块 + 输出模块</li>
            <li>对输入、变换、输出分别细化，得到结构图</li>
          </ol>
          <h4>事务型数据流</h4>
          <p>数据流到达一个<strong>事务中心</strong>，由事务中心根据类型<strong>选择</strong>不同处理路径。</p>
          <p><strong>方法二（事务分析）：</strong></p>
          <ol>
            <li>识别<strong>事务中心</strong>和<strong>事务路径</strong></li>
            <li>设计顶层：接收模块 + 事务中心 + 各事务处理模块</li>
            <li>每条事务路径对应一个处理分支</li>
          </ol>
          <div class="tip-box">先判断 DFD 是变换型还是事务型，再选对应方法。混合类型可分区处理。</div>
        `
      },
      {
        id: "5-11",
        title: "两种抽象：数据抽象、过程抽象",
        tags: ["概念"],
        content: `
          <ul>
            <li><strong>数据抽象</strong>：描述数据的<strong>逻辑特征</strong>，忽略具体实现。如"学生"抽象为 {学号, 姓名, 成绩}</li>
            <li><strong>过程抽象</strong>：描述功能的<strong>逻辑过程</strong>，忽略具体算法。如"排序"抽象为输入序列 → 有序序列</li>
          </ul>
          <p>抽象是逐步求精的基础，先抽象后具体。</p>
        `
      }
    ]
  },
  {
    id: "ch6",
    title: "第六章 详细设计",
    questions: [
      {
        id: "6-1",
        title: "详细设计的主要任务和目的",
        tags: ["简答"],
        content: `
          <h4>目的</h4>
          <p>确定<strong>怎样具体实现</strong>所要求的系统，为编码提供详细蓝图。</p>
          <h4>主要任务</h4>
          <ol>
            <li>设计每个模块的<strong>算法</strong>（流程、逻辑）</li>
            <li>设计模块内的<strong>数据结构</strong></li>
            <li>设计<strong>数据库</strong>（如需要）</li>
            <li>编写<strong>详细设计说明书</strong></li>
            <li>设计<strong>测试方案</strong></li>
          </ol>
          <p>成果：<strong>详细设计说明书</strong>，包含程序流程图、盒图、PAD 图、伪代码等。</p>
        `
      },
      {
        id: "6-2",
        title: "结构化程序设计思想及三种基本结构",
        tags: ["重点"],
        content: `
          <h4>思想</h4>
          <p>自顶向下、逐步求精、单入口单出口，用<strong>三种基本结构</strong>构造程序，避免 goto。</p>
          <h4>三种基本结构</h4>
          <table class="compare-table">
            <tr><th>结构</th><th>特点</th><th>N-S 图表示</th></tr>
            <tr><td><strong>顺序</strong></td><td>按顺序执行</td><td>上下相连的矩形框</td></tr>
            <tr><td><strong>选择</strong>（if-else）</td><td>根据条件选分支</td><td>IF-THEN-ELSE 框</td></tr>
            <tr><td><strong>循环</strong>（while/for）</td><td>条件满足则重复</td><td>DO-WHILE 或 WHILE-DO 框</td></tr>
          </table>
          <p>任意算法都可用这三种结构组合实现。</p>
        `
      },
      {
        id: "6-3",
        title: "结构化程序设计优点及非结构化转结构化",
        tags: ["简答"],
        content: `
          <h4>优点</h4>
          <ul>
            <li>程序结构清晰，易读、易理解</li>
            <li>易维护、易修改</li>
            <li>易测试、易调试</li>
            <li>可靠性高，错误少</li>
          </ul>
          <h4>非结构化 → 结构化转化方法</h4>
          <ol>
            <li>识别"不良结构"（如 goto、多入口多出口）</li>
            <li>用<strong>选择</strong>和<strong>循环</strong>结构替代 goto</li>
            <li>保证<strong>单入口单出口</strong></li>
            <li>逐步分解为三种基本结构的组合</li>
          </ol>
        `
      },
      {
        id: "6-4",
        title: "程序流程图、盒图、N-S 图、PAD 图与伪代码",
        tags: ["应用题", "重点"],
        content: `
          <h4>四种工具对比</h4>
          <table class="compare-table">
            <tr><th>工具</th><th>特点</th><th>符号要点</th></tr>
            <tr><td><strong>程序流程图</strong></td><td>直观，但可画 unstructured</td><td>起止框、处理框、判断框、流线</td></tr>
            <tr><td><strong>盒图 N-S</strong></td><td>强制结构化，无流线</td><td>矩形框嵌套，顺序上下、选择左右、循环加条件</td></tr>
            <tr><td><strong>PAD 图</strong></td><td>二维树形，清晰</td><td>竖线表控制，横线表模块</td></tr>
            <tr><td><strong>伪代码</strong></td><td>接近代码，易实现</td><td>IF-THEN-ELSE, WHILE-DO 等</td></tr>
          </table>
          <h4>转换要点</h4>
          <p>四种工具描述同一算法，可相互转换。N-S 图、PAD 图天然结构化，流程图需注意避免随意 goto。</p>
        `
      },
      {
        id: "6-5",
        title: "变换型与事务型数据流图",
        tags: ["概念"],
        content: `
          <ul>
            <li><strong>变换型</strong>：数据经输入 → <strong>变换中心</strong> → 输出，呈线性变换</li>
            <li><strong>事务型</strong>：数据到达<strong>事务中心</strong>，根据类型<strong>选择</strong>不同处理路径（多分支）</li>
          </ul>
          <p>详细设计阶段，根据 DFD 类型选择变换分析或事务分析，得到程序结构。</p>
        `
      },
      {
        id: "6-6",
        title: "判定树与判定表",
        tags: ["应用题"],
        content: `
          <h4>判定树</h4>
          <p>用<strong>树形结构</strong>表示多种条件组合下的动作选择，适合条件层次清晰的情况。</p>
          <h4>判定表</h4>
          <p>用<strong>表格</strong>列出所有条件组合及对应动作，适合条件组合复杂、需穷举的情况。</p>
          <table class="compare-table">
            <tr><th>结构</th><th>内容</th></tr>
            <tr><td>条件桩</td><td>所有条件</td></tr>
            <tr><td>条件项</td><td>条件取值（T/F）</td></tr>
            <tr><td>动作桩</td><td>所有动作</td></tr>
            <tr><td>动作项</td><td>该组合下的动作（× 表示执行）</td></tr>
          </table>
        `
      },
      {
        id: "6-7",
        title: "程序流图与环形复杂度（McCabe 方法）",
        tags: ["应用题", "重点"],
        content: `
          <h4>程序流图</h4>
          <p>描述程序控制流，节点为语句/判定，边为控制转移。</p>
          <h4>环形复杂度 V(G) — McCabe 方法</h4>
          <p>定量度量程序复杂程度，<strong>值越大越复杂</strong>，建议 V(G) ≤ 10。</p>
          <h4>三种计算公式（任选其一）</h4>
          <ol>
            <li><strong>V(G) = E - N + 2</strong>（E=边数，N=节点数）</li>
            <li><strong>V(G) = P + 1</strong>（P=判定节点数）</li>
            <li><strong>V(G) = 区域数</strong>（由边围成的封闭区域数，含外部区域）</li>
          </ol>
          <div class="example-box">
            <strong>例题：</strong>顺序-判断-分支-汇合<br>
            节点 5 个，边 6 条 → V(G) = 6 - 5 + 2 = <strong>3</strong><br>
            或：2 个判定节点 → V(G) = 2 + 1 = <strong>3</strong>
          </div>
          <p><strong>意义：</strong>V(G) 也是<strong>独立路径</strong>的基本集合中路径条数，用于设计测试用例。</p>
        `
      }
    ]
  },
  {
    id: "ch7",
    title: "第七章 实现（软件测试）",
    questions: [
      {
        id: "7-1",
        title: "软件测试的目标与衡量标准",
        tags: ["简答"],
        content: `
          <h4>目标</h4>
          <p><strong>发现错误</strong>，而非证明无错。测试是为了<strong>找出软件中的错误</strong>。</p>
          <blockquote>好的测试方案：很可能发现尚未发现的错误。<br>成功的测试：发现了尚未发现的错误。</blockquote>
          <h4>衡量标准</h4>
          <ul>
            <li>测试用例发现错误的能力</li>
            <li>测试覆盖率（语句、分支、路径等）</li>
            <li>是否达到需求规格说明的要求</li>
          </ul>
        `
      },
      {
        id: "7-2",
        title: "模块测试、集成测试、确认测试",
        tags: ["重点", "简答"],
        content: `
          <table class="compare-table">
            <tr><th>类型</th><th>对象</th><th>主要目标</th><th>方法</th></tr>
            <tr><td><strong>模块测试</strong>（单元测试）</td><td>单个模块</td><td>验证模块接口、局部数据结构、独立路径、错误处理</td><td>白盒为主，辅以黑盒</td></tr>
            <tr><td><strong>集成测试</strong></td><td>模块组装后的子系统/系统</td><td>检验模块接口、组装后的功能、数据传递</td><td>非渐增式/渐增式（自顶向下、自底向上）</td></tr>
            <tr><td><strong>确认测试</strong>（验收测试）</td><td>完整系统</td><td>验证是否满足需求规格说明，用户验收</td><td>黑盒测试</td></tr>
          </table>
        `
      },
      {
        id: "7-3",
        title: "自顶向下 vs 自底向上集成",
        tags: ["对比", "简答"],
        content: `
          <table class="compare-table">
            <tr><th></th><th>自顶向下</th><th>自底向上</th></tr>
            <tr><td><strong>思路</th><td>从主控模块开始，用桩模块替代下层</td><td>从底层模块开始，用驱动模块替代上层</td></tr>
            <tr><td><strong>优点</th><td>早期验证主要控制逻辑；能早期演示</td><td>底层模块先测，易发现底层错误；不需桩模块</td></tr>
            <tr><td><strong>缺点</th><td>底层测试晚；桩模块设计复杂</td><td>上层测试晚；驱动模块多；整体逻辑验证晚</td></tr>
            <tr><td><strong>适用</th><td>控制结构清晰、接口明确</td><td>底层模块稳定、上层变化多</td></tr>
          </table>
        `
      },
      {
        id: "7-4",
        title: "白盒测试与黑盒测试",
        tags: ["重点", "对比"],
        content: `
          <table class="compare-table">
            <tr><th>对比项</th><th>白盒测试（结构测试）</th><th>黑盒测试（功能测试）</th></tr>
            <tr><td><strong>方法</strong></td><td>根据程序<strong>内部逻辑</strong>设计用例</td><td>根据<strong>功能规格</strong>设计用例，不看内部</td></tr>
            <tr><td><strong>思想</strong></td><td>覆盖程序结构（语句、分支、路径）</td><td>等价类、边界值、因果图等</td></tr>
            <tr><td><strong>依据</strong></td><td>程序代码、设计文档</td><td>需求规格说明书</td></tr>
            <tr><td><strong>适用</strong></td><td>模块测试、集成测试（部分）</td><td>确认测试、系统测试</td></tr>
            <tr><td><strong>特点</strong></td><td>可测逻辑覆盖，无法发现遗漏功能</td><td>可测功能正确性，无法测未实现路径</td></tr>
          </table>
        `
      },
      {
        id: "7-5",
        title: "白盒测试：逻辑覆盖及强弱关系",
        tags: ["应用题", "重点"],
        content: `
          <h4>逻辑覆盖（由弱到强）</h4>
          <table class="compare-table">
            <tr><th>覆盖</th><th>含义</th><th>强弱</th></tr>
            <tr><td>语句覆盖</td><td>每条语句至少执行一次</td><td>最弱</td></tr>
            <tr><td>判定覆盖（分支覆盖）</td><td>每个判定的真/假分支至少各执行一次</td><td>↑</td></tr>
            <tr><td>条件覆盖</td><td>每个条件的真/假至少各出现一次</td><td>↑</td></tr>
            <tr><td>判定-条件覆盖</td><td>判定覆盖 + 条件覆盖</td><td>↑</td></tr>
            <tr><td>条件组合覆盖</td><td>每个判定中各条件的所有组合至少各出现一次</td><td>较强</td></tr>
            <tr><td>路径覆盖</td><td>每条可能执行路径至少执行一次</td><td>最强</td></tr>
          </table>
          <div class="tip-box">强弱关系：路径覆盖 ⊃ 条件组合 ⊃ 判定-条件 ⊃ 判定/条件 ⊃ 语句覆盖（一般情况）</div>
          <h4>设计测试用例步骤</h4>
          <ol>
            <li>画出程序流图</li>
            <li>确定覆盖标准</li>
            <li>根据标准设计用例，使每条路径/分支/语句被覆盖</li>
          </ol>
        `
      },
      {
        id: "7-6",
        title: "白盒控制结构测试的三种技术",
        tags: ["简答"],
        content: `
          <ol>
            <li><strong>条件测试</strong>：检验程序中条件判断的正确性，设计使各条件取真/假的用例</li>
            <li><strong>循环测试</strong>：针对循环结构，测试 0 次、1 次、多次、最大次数、比最大多 1 次等</li>
            <li><strong>基本路径测试</strong>：基于 McCabe 环形复杂度，设计覆盖所有独立路径的用例</li>
          </ol>
        `
      },
      {
        id: "7-7",
        title: "黑盒测试技术及设计依据",
        tags: ["重点", "应用"],
        content: `
          <h4>三种主要技术</h4>
          <ol>
            <li><strong>等价类划分</strong>：将输入划分为若干等价类，每类选一个代表用例。有效等价类 + 无效等价类</li>
            <li><strong>边界值分析</strong>：选取边界及边界附近的值（min, max, min-1, max+1 等），因边界易出错</li>
            <li><strong>因果图</strong>：分析输入条件（因）与输出（果）的逻辑关系，设计组合用例</li>
          </ol>
          <h4>设计测试用例时研究的文档</h4>
          <p><strong>需求规格说明书</strong>、功能说明、用户手册等，<strong>不研究程序代码</strong>。</p>
        `
      },
      {
        id: "7-8",
        title: "回归测试",
        tags: ["概念", "简答"],
        content: `
          <h4>定义</h4>
          <p>软件修改后，<strong>重新进行测试</strong>，确保修改没有引入新错误，且原有功能仍正常。</p>
          <h4>意义</h4>
          <ul>
            <li>保证修改的正确性</li>
            <li>防止"修复一个 bug 引入新 bug"</li>
            <li>维护软件质量</li>
          </ul>
          <h4>何时做回归测试</h4>
          <ul>
            <li>软件发生修改（纠错、增加功能、适应环境）后</li>
            <li>每次维护后</li>
            <li>集成新模块后</li>
          </ul>
        `
      },
      {
        id: "7-9",
        title: "软件可靠性与可用性",
        tags: ["概念"],
        content: `
          <ul>
            <li><strong>可靠性</strong>：软件在<strong>指定条件下、指定时间内</strong>，<strong>不出现故障</strong>的概率。MTBF（平均无故障时间）越长越可靠</li>
            <li><strong>可用性</strong>：软件<strong>可使用</strong>的程度，= 正常运行时间 / 总时间。MTTR（平均修复时间）越短可用性越高</li>
          </ul>
          <p>关系：可用性 = 可靠性 / (可靠性 + 修复时间相关项)，两者相关但不同。</p>
        `
      }
    ]
  },
  {
    id: "ch8",
    title: "第八章 维护",
    questions: [
      {
        id: "8-1",
        title: "软件维护的定义与本质",
        tags: ["简答"],
        content: `
          <h4>定义</h4>
          <p>在软件<strong>交付使用</strong>后，为了<strong>改正错误</strong>、<strong>适应环境变化</strong>、<strong>完善功能</strong>而修改软件的过程。</p>
          <h4>本质</h4>
          <p>软件维护的本质是<strong>修改已存在的软件</strong>，而不是开发新软件。维护阶段占软件生命周期的大部分时间和成本。</p>
        `
      },
      {
        id: "8-2",
        title: "四类软件维护及比例",
        tags: ["填空", "常考"],
        content: `
          <table class="compare-table">
            <tr><th>类型</th><th>含义</th><th>触发原因</th><th>约占比例</th></tr>
            <tr><td><strong>改正性维护</strong></td><td>修复运行中发现的错误</td><td>软件错误、缺陷</td><td>~20%</td></tr>
            <tr><td><strong>适应性维护</strong></td><td>适应运行环境变化</td><td>OS、硬件、数据格式变化</td><td>~50%</td></tr>
            <tr><td><strong>完善性维护</strong></td><td>改进性能、扩充功能</td><td>用户新需求</td><td>~50%</td></tr>
            <tr><td><strong>预防性维护</strong></td><td>提高可维护性、可靠性</td><td>主动重构、文档完善</td><td>~4%</td></tr>
          </table>
          <p>完善性 + 适应性占维护工作的大部分。</p>
        `
      },
      {
        id: "8-3",
        title: "软件维护成本占比",
        tags: ["填空"],
        content: `
          <p>软件维护成本约占软件<strong>总预算的 60%～80% 以上</strong>，有的甚至高达 90%。</p>
          <div class="tip-box">考点：维护是软件生命周期中<strong>成本最高</strong>的阶段。</div>
        `
      },
      {
        id: "8-4",
        title: "决定软件可维护性的因素",
        tags: ["简答", "填空"],
        content: `
          <ol>
            <li><strong>可理解性</strong>：维护人员能否理解软件的结构、逻辑</li>
            <li><strong>可测试性</strong>：能否方便地设计测试用例、执行测试</li>
            <li><strong>可修改性</strong>：能否方便、安全地修改，修改影响范围小</li>
            <li><strong>可移植性</strong>：能否方便地移植到其他环境</li>
            <li><strong>可重用性</strong>：模块/组件能否在其他系统中复用</li>
          </ol>
          <p>记忆：<strong>理测修移重</strong>（理解、测试、修改、移植、重用）</p>
        `
      }
    ]
  },
  {
    id: "ch9",
    title: "第九章 面向对象方法学引论",
    questions: [
      {
        id: "9-1",
        title: "面向对象相关概念",
        tags: ["重点", "简答"],
        content: `
          <h4>OO = 对象 + 类 + 继承 + 消息通信</h4>
          <h4>面向对象优点</h4>
          <ol>
            <li><strong>自然</strong>：符合人类认识世界的习惯</li>
            <li><strong>稳定性</strong>：对象相对稳定，需求变化影响小</li>
            <li><strong>可重用</strong>：类、组件可复用</li>
            <li><strong>适合大型软件</strong>：模块化、易扩展</li>
            <li><strong>可维护性好</strong>：易理解、易修改、易测试</li>
          </ol>
          <h4>对象的特点</h4>
          <ul>
            <li>对象是唯一性（每个对象有唯一标识）</li>
            <li>分类性（属于某类）</li>
            <li>封装性（数据与操作封装）</li>
            <li>多态性（同一操作不同响应）</li>
            <li>继承性（子类继承父类）</li>
          </ul>
          <h4>核心概念</h4>
          <table class="compare-table">
            <tr><th>概念</th><th>说明</th></tr>
            <tr><td>类</td><td>具有相同属性和方法的对象的抽象</td></tr>
            <tr><td>实例</td><td>类的具体对象</td></tr>
            <tr><td>消息</td><td>对象间通信的请求</td></tr>
            <tr><td>方法</td><td>对象的操作/行为</td></tr>
            <tr><td>属性</td><td>对象的状态/数据</td></tr>
            <tr><td>封装</td><td>隐藏内部实现，只暴露接口</td></tr>
            <tr><td>继承</td><td>子类继承父类属性和方法</td></tr>
            <tr><td>多态</td><td>同一接口不同实现</td></tr>
            <tr><td>重载</td><td>同名方法/函数，参数不同</td></tr>
          </table>
        `
      },
      {
        id: "9-2",
        title: "面向对象建模：对象关系与三种模型",
        tags: ["应用题", "重点"],
        content: `
          <h4>对象间关系</h4>
          <table class="compare-table">
            <tr><th>关系</th><th>说明</th><th>示例</th></tr>
            <tr><td><strong>关联</strong></td><td>对象间的结构联系</td><td>老师 ↔ 学生</td></tr>
            <tr><td><strong>聚集</strong></td><td>整体-部分，关联的特例</td><td>班级 ⊃ 学生（组合/共享）</td></tr>
            <tr><td><strong>泛化（继承）</strong></td><td>一般-特殊，is-a</td><td>人 → 学生</td></tr>
            <tr><td><strong>依赖</strong></td><td>使用关系，临时</td><td>A 使用 B 的服务</td></tr>
            <tr><td><strong>细化</strong></td><td>不同抽象层的关系</td><td>设计类 → 实现类</td></tr>
          </table>
          <h4>班级-学生 关系区分</h4>
          <ul>
            <li><strong>泛化</strong>：学生 is-a 人</li>
            <li><strong>聚集</strong>：班级 has-a 学生（整体-部分）</li>
            <li><strong>关联</strong>：学生 选修 课程（一般联系）</li>
          </ul>
          <h4>三种模型</h4>
          <table class="compare-table">
            <tr><th>模型</th><th>工具</th><th>描述</th></tr>
            <tr><td>对象模型</td><td>类图</td><td>静态结构、类及关系</td></tr>
            <tr><td>动态模型</td><td>状态图、顺序图/事件追踪图</td><td>行为、状态转换、交互</td></tr>
            <tr><td>功能模型</td><td>DFD、用例图</td><td>系统功能、数据流</td></tr>
          </table>
        `
      },
      {
        id: "9-3",
        title: "用例建模",
        tags: ["应用题"],
        content: `
          <h4>用例图成分</h4>
          <ul>
            <li><strong>系统边界</strong>：矩形框</li>
            <li><strong>用例</strong>：椭圆，表示功能</li>
            <li><strong>行为者（Actor）</strong>：人形，系统外部实体</li>
          </ul>
          <h4>用例间关系</h4>
          <ul>
            <li><strong>关联</strong>：行为者与用例之间的交互</li>
            <li><strong>包含（include/使用）</strong>：必须执行的公共子功能，箭头指向被包含用例</li>
            <li><strong>扩展（extend）</strong>：可选的扩展功能，箭头指向被扩展用例</li>
            <li><strong>泛化</strong>：用例间的继承</li>
          </ul>
          <div class="example-box">
            "登录" include "验证身份" — 登录时必须验证<br>
            "查询" extend "打印" — 查询时可选择打印
          </div>
        `
      }
    ]
  },
  {
    id: "ch13",
    title: "第十三章 软件工程过程管理",
    questions: [
      {
        id: "13-1",
        title: "设计项目小组需考虑的因素",
        tags: ["简答"],
        content: `
          <ul>
            <li><strong>项目规模</strong>：规模决定团队大小</li>
            <li><strong>技术复杂度</strong>：技术难度影响人员结构</li>
            <li><strong>人员经验与能力</strong>：少而精，角色匹配</li>
            <li><strong>沟通成本</strong>：人数增加，沟通成本指数增长（n(n-1)/2）</li>
            <li><strong>开发周期</strong>：时间紧可能需要更多人（Brooks 法则：加人可能更慢）</li>
            <li><strong>组织文化</strong>：扁平/层级结构</li>
          </ul>
        `
      },
      {
        id: "13-2",
        title: "软件度量与质量保证",
        tags: ["概念"],
        content: `
          <h4>软件度量</h4>
          <p>对软件开发过程、产品进行<strong>定量描述</strong>，用于管理、评估、改进。如：代码行数、缺陷密度、生产率、复杂度等。</p>
          <h4>软件质量保证（SQA）</h4>
          <p>为保证软件质量开展的有计划、有系统的活动，包括：</p>
          <ul>
            <li>制定质量标准</li>
            <li>质量审计、评审</li>
            <li>过程改进</li>
            <li>测试管理</li>
          </ul>
        `
      },
      {
        id: "13-3",
        title: "Gantt 图的作用",
        tags: ["填空"],
        content: `
          <p><strong>Gantt 图（甘特图）</strong>是一种<strong>工程进度表</strong>，用<strong>横条</strong>表示各项<strong>任务</strong>的<strong>起止时间</strong>和<strong>持续时间</strong>，用于<strong>项目进度管理</strong>和<strong>任务调度</strong>。</p>
          <ul>
            <li>横轴：时间</li>
            <li>纵轴：任务</li>
            <li>横条：任务的时间跨度</li>
          </ul>
        `
      },
      {
        id: "13-4",
        title: "软件配置的概念",
        tags: ["概念"],
        content: `
          <p><strong>软件配置</strong>（Software Configuration）是软件在特定时刻的<strong>整体状态</strong>，包括：</p>
          <ul>
            <li>所有<strong>程序代码</strong>（源程序、目标程序）</li>
            <li>所有<strong>文档</strong>（需求、设计、手册等）</li>
            <li>所有<strong>数据</strong></li>
            <li>及其<strong>版本</strong>信息</li>
          </ul>
          <p>软件配置管理（SCM）是对这些配置项进行标识、控制、状态记录和审计。</p>
        `
      },
      {
        id: "13-5",
        title: "软件配置管理的三个成分",
        tags: ["填空"],
        content: `
          <ol>
            <li><strong>源程序</strong></li>
            <li><strong>数据集</strong>（数据文件、数据库等）</li>
            <li><strong>文档</strong>（需求、设计、测试、用户手册等）</li>
          </ol>
          <p>这三类统称为<strong>配置项</strong>，需纳入版本控制和变更管理。</p>
        `
      }
    ]
  },
  {
    id: "exam",
    title: "应用题解题指南",
    questions: [
      {
        id: "exam-1",
        title: "ER 图绘制要点",
        tags: ["应用题"],
        content: `
          <ol>
            <li>识别<strong>实体</strong>（名词）：学生、课程、教师…</li>
            <li>识别<strong>属性</strong>：学号、姓名、成绩…</li>
            <li>识别<strong>联系</strong>：选修、讲授、属于…</li>
            <li>确定联系类型：1:1、1:N、M:N</li>
            <li>矩形=实体，椭圆=属性，菱形=联系</li>
          </ol>
        `
      },
      {
        id: "exam-2",
        title: "DFD 绘制与 DFD→结构图",
        tags: ["应用题"],
        content: `
          <p>见第二章、第五章 DFD 与变换/事务分析。考试步骤：</p>
          <ol>
            <li>画 DFD（顶层→0 层→1 层）</li>
            <li>判断变换型/事务型</li>
            <li>识别变换中心/事务中心</li>
            <li>按方法一或方法二画结构图</li>
          </ol>
        `
      },
      {
        id: "exam-3",
        title: "环形复杂度与逻辑覆盖测试",
        tags: ["应用题"],
        content: `
          <p>V(G)=E-N+2 或 P+1。设计测试用例覆盖语句/判定/条件/路径。</p>
          <p>步骤：画流图 → 算 V(G) → 找独立路径 → 每条路径设计一组输入</p>
        `
      },
      {
        id: "exam-4",
        title: "黑盒测试用例设计",
        tags: ["应用题"],
        content: `
          <p>等价类：划分有效/无效类，每类选代表值。</p>
          <p>边界值：min, max, min-1, max+1, 空值, 非法值。</p>
          <p>依据：需求规格说明书。</p>
        `
      },
      {
        id: "exam-5",
        title: "盒图/N-S 图/程序流图转换",
        tags: ["应用题"],
        content: `
          <p>给定算法描述或伪代码，画出 N-S 图（强制结构化）或程序流图。</p>
          <p>N-S：顺序上下嵌套，选择 IF-ELSE 左右，循环在条件框内。</p>
        `
      }
    ]
  }
];
