/* 各章例题 + 应用题详细解析 */
const EXAMPLE_DATA = {
  ch1: [
    {
      id: "ex-1-1",
      title: "【例题】判断各阶段所属时期及成果物",
      tags: ["例题", "填空"],
      stem: `<p>某项目依次完成以下工作：明确"开发在线选课系统"、论证项目是否值得做、编写需求规格说明书、设计模块结构、编写详细设计说明、编码、测试、上线后修复 bug。请指出各工作属于生命周期的哪个<strong>时期</strong>、哪个<strong>阶段</strong>，以及对应<strong>成果物</strong>。</p>`,
      solution: `
        <h4>解题思路</h4>
        <p>先记三个时期：软件定义 → 软件开发 → 软件维护；再对应八个阶段。</p>
        <table class="compare-table">
          <tr><th>工作</th><th>时期</th><th>阶段</th><th>成果物</th></tr>
          <tr><td>明确开发在线选课系统</td><td>软件定义</td><td>问题定义</td><td>问题定义报告</td></tr>
          <tr><td>论证是否值得做</td><td>软件定义</td><td>可行性研究</td><td>可行性研究报告</td></tr>
          <tr><td>编写需求规格说明书</td><td>软件开发</td><td>需求分析</td><td>需求规格说明书</td></tr>
          <tr><td>设计模块结构</td><td>软件开发</td><td>总体设计</td><td>概要设计说明书</td></tr>
          <tr><td>编写详细设计说明</td><td>软件开发</td><td>详细设计</td><td>详细设计说明书</td></tr>
          <tr><td>编码</td><td>软件开发</td><td>编码</td><td>源程序清单</td></tr>
          <tr><td>测试</td><td>软件开发</td><td>测试</td><td>测试报告</td></tr>
          <tr><td>上线后修复 bug</td><td>软件维护</td><td>维护</td><td>维护记录/新版本</td></tr>
        </table>
        <div class="tip-box"><strong>易错点：</strong>需求分析属于<strong>软件开发时期</strong>，不是软件定义时期。软件定义只含"问题定义"和"可行性研究"。</div>
      `
    }
  ],
  ch2: [
    {
      id: "ex-2-1",
      title: "【例题】绘制图书借阅系统顶层 DFD",
      tags: ["例题", "应用题"],
      stem: `<p>图书借阅系统功能：读者提交借书请求，系统查询图书库存并记录借阅信息；读者还书时，系统更新库存和借阅记录。外部实体有<strong>读者</strong>和<strong>管理员</strong>。请绘制顶层数据流图，并说明各符号含义。</p>`,
      solution: `
        <h4>Step 1：识别外部实体</h4>
        <ul>
          <li>读者 — 借书、还书的请求来源</li>
          <li>管理员 — 可辅助管理（若题目要求可加入）</li>
        </ul>
        <h4>Step 2：识别加工与数据流</h4>
        <div class="example-box">
          <pre>
    ┌────────┐  借书请求   ┌──────────┐  借阅记录   ═══════
    │  读者  │──────────→│          │──────────→ 借阅库
    └────────┘           │ 图书借阅 │←──────────
         ↑               │   系统   │  库存信息
    还书请求│              └──────────┘──────────→ ═══════
         │                      ↑                图书库存
    ┌────────┐  管理操作         │
    │ 管理员 │─────────────────┘
    └────────┘
          </pre>
        </div>
        <h4>Step 3：符号对照</h4>
        <table class="compare-table">
          <tr><th>符号</th><th>名称</th><th>本题对应</th></tr>
          <tr><td>□</td><td>外部实体</td><td>读者、管理员</td></tr>
          <tr><td>○</td><td>加工</td><td>图书借阅系统（或拆分为借书处理、还书处理）</td></tr>
          <tr><td>→</td><td>数据流</td><td>借书请求、还书请求、借阅记录</td></tr>
          <tr><td>═</td><td>数据存储</td><td>图书库存、借阅库</td></tr>
        </table>
        <div class="warn-box"><strong>注意：</strong>加工必须有输入和输出；数据流必须有名称；顶层图只有一个总加工（或按题目要求分解）。</div>
      `
    }
  ],
  ch3: [
    {
      id: "ex-3-1",
      title: "【例题】ER 图：学生选课系统",
      tags: ["例题", "应用题"],
      stem: `<p>系统包含：学生（学号、姓名、性别）、课程（课程号、课程名、学分）、教师（工号、姓名）。一名学生可选多门课，一门课可被多名学生选；一名教师可讲授多门课，一门课可由一名教师讲授。请绘制 ER 图并标注联系类型。</p>`,
      solution: `
        <h4>Step 1：识别实体与属性</h4>
        <ul>
          <li><strong>学生</strong>：学号（主键）、姓名、性别</li>
          <li><strong>课程</strong>：课程号（主键）、课程名、学分</li>
          <li><strong>教师</strong>：工号（主键）、姓名</li>
        </ul>
        <h4>Step 2：识别联系及基数</h4>
        <table class="compare-table">
          <tr><th>联系</th><th>类型</th><th>说明</th></tr>
          <tr><td>学生 — 选修 — 课程</td><td><strong>M : N</strong></td><td>一名学生选多门课，一门课被多名学生选</td></tr>
          <tr><td>教师 — 讲授 — 课程</td><td><strong>1 : N</strong></td><td>一名教师教多门课，一门课仅一名教师</td></tr>
        </table>
        <h4>Step 3：ER 图结构（文字描述）</h4>
        <div class="example-box">
          <pre>
  [学生]——&lt;选修&gt;——[课程]——&lt;讲授&gt;——[教师]
   M        M:N        N        1:N        1

  学生.学号、姓名、性别
  课程.课程号、课程名、学分
  教师.工号、姓名
          </pre>
        </div>
        <h4>Step 4：可选 — 选修联系上的属性</h4>
        <p>若题目要求记录<strong>成绩</strong>，成绩应放在"选修"联系上（因为依赖学生+课程的组合），而不是放在学生或课程实体上。</p>
        <div class="tip-box"><strong>考试技巧：</strong>"一…多…"通常是 1:N；"多…多…"是 M:N；"一个…一个…"是 1:1。</div>
      `
    }
  ],
  ch5: [
    {
      id: "ex-5-1",
      title: "【例题】根据函数声明判断耦合类型",
      tags: ["例题", "应用题"],
      stem: `<p>判断下列模块接口分别属于哪种耦合（由好到差）：</p>
        <ol>
          <li><code>void print(int x, int y)</code></li>
          <li><code>void save(Student stu)</code>（Student 为结构体）</li>
          <li><code>void process(int flag)</code>（flag=1 执行 A，flag=2 执行 B）</li>
          <li>模块 A 直接修改模块 B 的内部变量 <code>b.count</code></li>
        </ol>`,
      solution: `
        <table class="compare-table">
          <tr><th>题号</th><th>耦合类型</th><th>解析</th></tr>
          <tr><td>①</td><td><strong>数据耦合</strong></td><td>仅传递基本类型参数 int，是最理想的耦合方式</td></tr>
          <tr><td>②</td><td><strong>标记耦合</strong></td><td>传递结构体/记录，传递的是"数据结构的标记"</td></tr>
          <tr><td>③</td><td><strong>控制耦合</strong></td><td>flag 是控制开关，决定被调用模块内部走哪条分支</td></tr>
          <tr><td>④</td><td><strong>内容耦合</strong></td><td>直接访问/修改另一模块内部数据，是最差的耦合</td></tr>
        </table>
        <div class="tip-box"><strong>记忆：</strong>基本类型→数据；结构体→标记；开关变量→控制；全局变量→公共；直接访问内部→内容。</div>
      `
    },
    {
      id: "ex-5-2",
      title: "【例题】变换型 DFD 转结构图",
      tags: ["例题", "应用题"],
      stem: `<p>某数据处理系统的 0 层 DFD 如下：输入"原始数据" → 加工"格式检查" → 加工"数据变换" → 加工"报表生成" → 输出"报表"。请用<strong>变换分析（方法一）</strong>画出软件结构图。</p>`,
      solution: `
        <h4>Step 1：判断类型</h4>
        <p>数据流呈"输入 → 变换 → 输出"线性结构 → <strong>变换型</strong>数据流。</p>
        <h4>Step 2：识别三部分</h4>
        <ul>
          <li><strong>输入</strong>：格式检查</li>
          <li><strong>变换中心</strong>：数据变换</li>
          <li><strong>输出</strong>：报表生成</li>
        </ul>
        <h4>Step 3：结构图</h4>
        <div class="example-box">
          <pre>
              [主控模块]
             /    |    \\
        [输入] [变换] [输出]
          |      |      |
      [格式检查][数据变换][报表生成]
          </pre>
        </div>
        <h4>Step 4：解释</h4>
        <ol>
          <li>顶层主控模块协调三个子系统</li>
          <li>输入分支负责"格式检查"</li>
          <li>变换分支的核心是"数据变换"（变换中心）</li>
          <li>输出分支负责"报表生成"</li>
        </ol>
        <div class="warn-box">若是事务型（如"根据类型分发到不同处理"），则用<strong>事务分析（方法二）</strong>，顶层为：接收模块 + 事务中心 + 各事务处理模块。</div>
      `
    }
  ],
  ch6: [
    {
      id: "ex-6-1",
      title: "【例题】计算环形复杂度 V(G)",
      tags: ["例题", "应用题"],
      stem: `<p>以下程序对应流图有 <strong>7 个节点、8 条边、2 个判定节点</strong>（两个 if）。求环形复杂度 V(G) 及独立路径条数。</p>
        <div class="example-box"><pre>
开始 → A → if(B) → C → D → if(E) → F → 结束
              ↓              ↓
              G              H
        </pre></div>`,
      solution: `
        <h4>方法一：V(G) = E − N + 2</h4>
        <p>V(G) = 8 − 7 + 2 = <strong>3</strong></p>
        <h4>方法二：V(G) = P + 1</h4>
        <p>P = 2（两个判定节点）→ V(G) = 2 + 1 = <strong>3</strong></p>
        <h4>独立路径（共 3 条）</h4>
        <ol>
          <li>路径 1：A → B(真) → C → D → E(真) → F → 结束</li>
          <li>路径 2：A → B(真) → C → D → E(假) → H → 结束</li>
          <li>路径 3：A → B(假) → G → … → 结束</li>
        </ol>
        <div class="tip-box"><strong>结论：</strong>V(G)=3 表示至少需要 <strong>3 组测试用例</strong> 才能覆盖所有独立路径。考试常同时考 V(G) 计算 + 逻辑覆盖测试用例设计。</div>
      `
    },
    {
      id: "ex-6-2",
      title: "【例题】伪代码转 N-S 盒图",
      tags: ["例题", "应用题"],
      stem: `<p>将以下算法绘制为 N-S 盒图：</p>
        <div class="example-box"><pre>
输入 n
sum ← 0, i ← 1
当 i ≤ n 时：
    sum ← sum + i
    i ← i + 1
输出 sum
        </pre></div>`,
      solution: `
        <h4>N-S 图（从上到下顺序嵌套）</h4>
        <div class="example-box">
          <pre>
┌─────────────────┐
│   输入 n         │
├─────────────────┤
│ sum←0; i←1      │
├─────────────────┤
│  ┌ while i≤n ─┐ │
│  │ sum←sum+i  │ │
│  │ i←i+1      │ │
│  └────────────┘ │
├─────────────────┤
│   输出 sum       │
└─────────────────┘
          </pre>
        </div>
        <h4>要点</h4>
        <ul>
          <li>N-S 图<strong>没有箭头流线</strong>，靠<strong>位置</strong>表示顺序</li>
          <li>循环框在条件下方包含循环体</li>
          <li>选择结构用 if-then-else 左右并列</li>
        </ul>
      `
    }
  ],
  ch7: [
    {
      id: "ex-7-1",
      title: "【例题】逻辑覆盖测试用例设计",
      tags: ["例题", "应用题"],
      stem: `<p>程序段：</p>
        <div class="example-box"><pre>
if (A > 0 AND B > 0) then
    X = 1
else
    X = 0
        </pre></div>
        <p>分别设计满足<strong>语句覆盖</strong>和<strong>判定覆盖</strong>的最少测试用例。</p>`,
      solution: `
        <h4>语句覆盖（最弱）</h4>
        <p>目标：每条语句至少执行一次。只需让 if 和 else 各执行一次：</p>
        <table class="compare-table">
          <tr><th>用例</th><th>A</th><th>B</th><th>走分支</th><th>覆盖</th></tr>
          <tr><td>TC1</td><td>1</td><td>1</td><td>then → X=1</td><td>if 内语句</td></tr>
          <tr><td>TC2</td><td>-1</td><td>1</td><td>else → X=0</td><td>else 语句</td></tr>
        </table>
        <h4>判定覆盖（分支覆盖）</h4>
        <p>目标：每个判定的<strong>真分支和假分支</strong>至少各执行一次：</p>
        <table class="compare-table">
          <tr><th>用例</th><th>A</th><th>B</th><th>判定结果</th></tr>
          <tr><td>TC1</td><td>1</td><td>1</td><td>真 → X=1</td></tr>
          <tr><td>TC2</td><td>-1</td><td>1</td><td>假 → X=0</td></tr>
        </table>
        <h4>强弱关系</h4>
        <p>本题中判定覆盖与语句覆盖用例数相同，但一般情况：<strong>路径覆盖 > 条件组合 > 判定-条件 > 判定/条件 > 语句</strong>。</p>
      `
    },
    {
      id: "ex-7-2",
      title: "【例题】黑盒测试：等价类 + 边界值",
      tags: ["例题", "应用题"],
      stem: `<p>某输入字段要求：整数，范围 1～100（含 1 和 100）。请用等价类划分和边界值分析设计测试用例。</p>`,
      solution: `
        <h4>等价类划分</h4>
        <table class="compare-table">
          <tr><th>等价类</th><th>类型</th><th>代表值</th></tr>
          <tr><td>[1, 100]</td><td>有效</td><td>50</td></tr>
          <tr><td>&lt; 1</td><td>无效</td><td>0, -1</td></tr>
          <tr><td>&gt; 100</td><td>无效</td><td>101, 200</td></tr>
          <tr><td>非整数</td><td>无效</td><td>1.5, "abc"</td></tr>
        </table>
        <h4>边界值分析（重点！）</h4>
        <table class="compare-table">
          <tr><th>用例</th><th>输入</th><th>说明</th></tr>
          <tr><td>TC1</td><td>1</td><td>最小边界（有效）</td></tr>
          <tr><td>TC2</td><td>100</td><td>最大边界（有效）</td></tr>
          <tr><td>TC3</td><td>0</td><td>min − 1（无效）</td></tr>
          <tr><td>TC4</td><td>101</td><td>max + 1（无效）</td></tr>
        </table>
        <div class="tip-box">黑盒测试依据<strong>需求规格说明书</strong>，不看代码。边界值是考试最高频考点之一。</div>
      `
    }
  ],
  ch8: [
    {
      id: "ex-8-1",
      title: "【例题】判断四类维护类型",
      tags: ["例题", "简答"],
      stem: `<p>判断下列维护活动分别属于哪类软件维护：</p>
        <ol>
          <li>修复程序运行中发现的计算错误</li>
          <li>将系统从 Windows 迁移到 Linux</li>
          <li>用户要求增加"导出 Excel"功能</li>
          <li>重构代码以提高可读性，尚未发现错误</li>
        </ol>`,
      solution: `
        <table class="compare-table">
          <tr><th>题号</th><th>维护类型</th><th>理由</th></tr>
          <tr><td>①</td><td><strong>改正性维护</strong></td><td>修复运行中发现的错误/缺陷</td></tr>
          <tr><td>②</td><td><strong>适应性维护</strong></td><td>适应运行环境（OS）变化</td></tr>
          <tr><td>③</td><td><strong>完善性维护</strong></td><td>扩充功能、改进性能，满足用户新需求</td></tr>
          <tr><td>④</td><td><strong>预防性维护</strong></td><td>主动改进可维护性，非修复已知错误</td></tr>
        </table>
        <div class="tip-box">比例记忆：完善性+适应性约占 70%～80%；改正性约 20%；预防性最少（约 4%）。维护成本占总预算 <strong>60%～80% 以上</strong>。</div>
      `
    }
  ],
  ch9: [
    {
      id: "ex-9-1",
      title: "【例题】区分类间关系：泛化、聚集、关联",
      tags: ["例题", "应用题"],
      stem: `<p>判断下列关系类型：</p>
        <ol>
          <li>学生 — 人</li>
          <li>班级 — 学生</li>
          <li>学生 — 课程（选修）</li>
          <li>汽车 — 发动机</li>
        </ol>`,
      solution: `
        <table class="compare-table">
          <tr><th>关系</th><th>类型</th><th>关键词</th></tr>
          <tr><td>学生 — 人</td><td><strong>泛化（继承）</strong></td><td>student is-a person</td></tr>
          <tr><td>班级 — 学生</td><td><strong>聚集（组合）</strong></td><td>班级 has-a 学生，整体-部分</td></tr>
          <tr><td>学生 — 课程</td><td><strong>关联</strong></td><td>一般业务联系，选修关系</td></tr>
          <tr><td>汽车 — 发动机</td><td><strong>组合聚集</strong></td><td>部分不能脱离整体单独存在</td></tr>
        </table>
        <div class="warn-box"><strong>区分：</strong>泛化= is-a；聚集= has-a（整体-部分）；关联= 普通联系（uses/选修/购买）。</div>
      `
    },
    {
      id: "ex-9-2",
      title: "【例题】用例图：include 与 extend",
      tags: ["例题", "应用题"],
      stem: `<p>在线购物系统中："下单"必须"登录验证"；"查看订单"可选"打印订单"。请说明用例关系并画简要用例图。</p>`,
      solution: `
        <h4>关系判断</h4>
        <ul>
          <li><strong>下单 include 登录验证</strong>：下单<strong>必须</strong>执行登录，箭头指向被包含用例</li>
          <li><strong>查看订单 extend 打印订单</strong>：打印是<strong>可选</strong>扩展，箭头指向被扩展用例（打印 → 查看订单）</li>
        </ul>
        <div class="example-box">
          <pre>
  [顾客] ─── (下单) ──include──→ (登录验证)
  [顾客] ─── (查看订单) ←──extend── (打印订单)
          </pre>
        </div>
        <div class="tip-box"><strong>记忆：</strong>include = 必须做（<<include>>）；extend = 可选做（<<extend>>）。箭头都指向被包含/被扩展的用例。</div>
      `
    }
  ],
  exam: [
    {
      id: "ex-exam-1",
      title: "【综合应用题】DFD + 结构图 + 环形复杂度",
      tags: ["例题", "应用题"],
      stem: `<p><strong>题目：</strong>成绩处理系统接收"原始成绩"，经"合法性检查"后，由"成绩计算"加工处理，最后"生成成绩单"输出。请：</p>
        <ol>
          <li>绘制 0 层 DFD</li>
          <li>判断数据流类型并画结构图</li>
          <li>若"合法性检查"和"成绩计算"各含 1 个 if 判定，求 V(G)</li>
        </ol>`,
      solution: `
        <h4>（1）0 层 DFD</h4>
        <div class="example-box"><pre>
[教师] → 原始成绩 → (成绩处理系统) → 成绩单 → [教师]
                         ↕
                      ═ 成绩文件 ═
        </pre></div>
        <p>分解：原始成绩 → [合法性检查] → [成绩计算] → [生成成绩单] → 成绩单</p>
        <h4>（2）结构图 — 变换分析</h4>
        <div class="example-box"><pre>
           [主控]
          /  |  \\
      [输入][变换][输出]
        |    |    |
    [合法性][成绩][生成]
     [检查][计算][成绩单]
        </pre></div>
        <p>变换中心 = 成绩计算；输入 = 合法性检查；输出 = 生成成绩单。</p>
        <h4>（3）环形复杂度</h4>
        <p>每个模块 1 个 if → 各 V(G)=2。整个程序若串联两个判定：V(G) = P+1 = 2+1 = <strong>3</strong>（按整体流图计算）。</p>
      `
    },
    {
      id: "ex-exam-2",
      title: "【综合应用题】ER 图 + 黑盒测试用例",
      tags: ["例题", "应用题"],
      stem: `<p><strong>题目：</strong>医院系统：患者（编号、姓名）可预约多个医生（工号、科室），一个医生可被多个患者预约；每次预约有预约日期。另外，输入"年龄"字段要求 0～150 的整数。请：</p>
        <ol>
          <li>绘制 ER 图</li>
          <li>设计年龄字段的黑盒测试用例（等价类+边界值）</li>
        </ol>`,
      solution: `
        <h4>（1）ER 图</h4>
        <ul>
          <li>实体：患者、医生</li>
          <li>联系：预约（M:N），联系属性：预约日期</li>
        </ul>
        <div class="example-box"><pre>
[患者] ——&lt;预约&gt;—— [医生]     M:N
         预约日期
        </pre></div>
        <h4>（2）黑盒测试用例</h4>
        <table class="compare-table">
          <tr><th>用例</th><th>年龄输入</th><th>类型</th><th>预期</th></tr>
          <tr><td>TC1</td><td>30</td><td>有效等价类</td><td>接受</td></tr>
          <tr><td>TC2</td><td>0</td><td>边界 min</td><td>接受</td></tr>
          <tr><td>TC3</td><td>150</td><td>边界 max</td><td>接受</td></tr>
          <tr><td>TC4</td><td>-1</td><td>边界 min−1</td><td>拒绝</td></tr>
          <tr><td>TC5</td><td>151</td><td>边界 max+1</td><td>拒绝</td></tr>
          <tr><td>TC6</td><td>3.5</td><td>无效（非整数）</td><td>拒绝</td></tr>
        </table>
      `
    },
    {
      id: "ex-exam-3",
      title: "【综合应用题】判定表 + 逻辑覆盖",
      tags: ["例题", "应用题"],
      stem: `<p>快递计费规则：重量 ≤ 1kg 收 10 元；1 &lt; 重量 ≤ 5kg 收 15 元；重量 &gt; 5kg 收 20 元。请：</p>
        <ol>
          <li>绘制判定表</li>
          <li>设计判定覆盖测试用例</li>
        </ol>`,
      solution: `
        <h4>（1）判定表</h4>
        <table class="compare-table">
          <tr><th></th><th>规则1</th><th>规则2</th><th>规则3</th></tr>
          <tr><td>条件：W ≤ 1</td><td>T</td><td>F</td><td>F</td></tr>
          <tr><td>条件：W ≤ 5</td><td>—</td><td>T</td><td>F</td></tr>
          <tr><td>动作：收费 10 元</td><td>×</td><td></td><td></td></tr>
          <tr><td>动作：收费 15 元</td><td></td><td>×</td><td></td></tr>
          <tr><td>动作：收费 20 元</td><td></td><td></td><td>×</td></tr>
        </table>
        <h4>（2）判定覆盖测试用例</h4>
        <table class="compare-table">
          <tr><th>用例</th><th>重量 W</th><th>预期费用</th><th>覆盖规则</th></tr>
          <tr><td>TC1</td><td>0.5</td><td>10</td><td>规则1</td></tr>
          <tr><td>TC2</td><td>3</td><td>15</td><td>规则2</td></tr>
          <tr><td>TC3</td><td>8</td><td>20</td><td>规则3</td></tr>
        </table>
        <p>边界补充：W=1（10元）、W=1.01（15元）、W=5（15元）、W=5.01（20元）。</p>
      `
    }
  ]
};
