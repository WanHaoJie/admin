<template>
  <div>
    <header>
      <h3>数据可视化——ECharts</h3>
      <h4>{{ nowDate }}{{ nowTime }}</h4>
    </header>
    <!-- 主体 -->
    <div class="Main">
      <div class="colnum">
        <div class="panel">
          <div class="title">柱状图—就业形势</div>
          <div class="center" ref="center"></div>
          <div class="Bottom"></div>
        </div>
        <div class="panel">
          <div class="title">柱状图—就业形势</div>
          <div class="center"></div>
          <div class="Bottom"></div>
        </div>
        <div class="panel">
          <div class="title">柱状图—就业形势</div>
          <div class="center"></div>
          <div class="Bottom"></div>
        </div>
      </div>
      <div class="colnum">
        <div class="center">
          <div class="top">
            <div class="shuliang">
              <div>133578</div>
              <div>104438</div>
            </div>
            <div class="zi">
              <div>前端需求人数</div>
              <div>市场供应人数</div>
            </div>
          </div>
          <div class="bottom"></div>
        </div>
      </div>
      <div class="colnum">
        <div class="panel">
          <div class="title">柱状图—就业形势</div>
          <div class="center"></div>
          <div class="Bottom"></div>
        </div>
        <div class="panel">
          <div class="title">柱状图—就业形势</div>
          <div class="center"></div>
          <div class="Bottom"></div>
        </div>
        <div class="panel">
          <div class="title">柱状图—就业形势</div>
          <div class="center"></div>
          <div class="Bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../utils/flexible.js";
import echarts from 'echarts'
export default {
  data() {
    return {
      myChart:'',
      nowDate: null, //存放年月日变量
      nowTime: null, //存放时分秒变量
      timer: "", //定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
    };
  },
  methods: {
    getTuBiao(){
      this.myChart = echarts.init(this.$refs.center);
      this.myChart.setOption({
        title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
      })
    },
      //获取当前时间的方法
    getTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const str = "";
      if (this.hour > 12) {
        this.hour -= 12;
        this.str = " AM";
      } else {
        this.str = " PM";
      }
      this.month = check(month);
      this.day = check(day);
      this.hour = check(hour);
      this.minute = check(minute);
      this.second = check(second);
      function check(i) {
        const num = i < 10 ? "0" + i : i;
        return num;
      }
      this.nowDate = year + "年" + this.month + "月" + this.day + "日";
      this.nowTime =
        this.hour + "时" + this.minute + "分" + this.second + "秒" + str;
    },
  },
  mounted() {
    this.timer = setInterval(this.getTime, 1000);
    this.getTuBiao();
  },
  beforDestroy() {
    if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
    }
  },
};
</script>

<style scoped lang="scss">
  header {
    width: 100%;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #070550;
    h3 {
      font-size: 0.375rem;
      text-align: center;
      margin-top: 10px;
      color: white;
    }
    h4 {
      font-size: 0.2rem;
      position: absolute;
      right: 20px;
      bottom: 10px;
      color: white;
      font-weight: normal;
    }
  }
  .Main {
    width: 100%;
    min-width: 1024px;
    max-width: 1920px;
    margin: 0 auto;
    background-color: #070550;
    padding: 0.125rem 0.125rem 0;
    position: absolute;
    left: 0;
    top: 60px;
    display: flex;
    .colnum {
      flex:3;
      .panel {
        position: relative;
        height: 3.11rem;
        border: 0.025rem solid rgba(25, 186, 139, 0.17);
        padding: 0.125rem;
        margin-top: 0.2rem;
        margin-bottom: 0.16rem;
        background-color: rgba(255,255,255,.1);
        &::before {
          position: absolute;
          left: 0;
          top: 0;
          width: 0.125rem;
          height: 0.125rem;
          border-left: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          content: '';
        }
        &::after {
          position: absolute;
          right: 0;
          top: 0;
          width: 0.125rem;
          height: 0.125rem;
          border-right: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          content: '';
        }
        .Bottom {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          &::before {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0.125rem;
            height: 0.125rem;
            border-left: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            content: '';
          }
          &::after {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 0.125rem;
            height: 0.125rem;
            border-right: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            content: '';
          }
        }
        .title {
          width: 100%;
          text-align: center;
          font-size: 0.25rem;
          line-height: 0.4375rem;
          color: white;
        }
        .center {
          width: 100%;
          height: 2.3rem;
          background-color: slateblue;
        }
      }
    }
    .colnum:nth-of-type(2) {
      flex: 5;
      padding: 0.22rem 0.125rem;
      .center {
        width: 100%;
        height: 100%;
        // background-color: skyblue;
        .top {
          width: 100%;
          height: 1.7rem;
          padding: 0.125rem 0.125rem;
          background-color: #141472;
          .shuliang {
            width: 100%;
            height: 1rem;
            position: relative;
            border: 0.025rem solid rgba(25, 186, 139, 0.17);
            display: flex;
            div {
              flex: 1;
              text-align: center;
              line-height: 1rem;
              font-size: 0.4375rem;
              color: #ffeba5;
              font-weight: bolder;
              position: relative;
              &:nth-of-type(1) {
                &::after {
                  position: absolute;
                  top: 25%;
                  right: 0;
                  height: 50%;
                  border: 1px solid rgba(25, 186, 139, 0.17);
                  content: '';
                }
              }
            }
            &::before {
              position: absolute;
              left: 0;
              top: 0;
              width: 25px;
              height: 10px;
              border-left: 2px solid #02a6b5;
              border-top: 2px solid #02a6b5;
              content: '';
            }
            &::after {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 25px;
              height: 10px;
              border-right: 2px solid #02a6b5;
              border-bottom: 2px solid #02a6b5;
              content: '';
            }
          }
          .zi {
            display: flex;
            div {
              flex: 1;
              text-align: center;
              font-size: 0.225rem;
              color: white;
              line-height: .6rem;
            }
          }
        }
      }
    }
  }

</style>