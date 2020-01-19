/**
 * 小程序配置文件
 */
//https://dut-eab.com/hcq/view/
var host = "www.dut-eab.com/hcq/view"

var config = {
  // 下面的地址配合云端 Server 工作
  host,
  t_requiredCourseUrl: `https://${host}/t_requiredCourse.php`,
  t_timeDistributionUrl: `https://${host}/t_timeDistribution.php`,
  t_learningConditionUrl: `https://${host}/t_learningCondition.php`,
  t_contentTreeUrl: `https://${host}/t_contentTree.php`,
  t_courseDetailUrl: `https://${host}/t_courseDetail.php`,
  t_rankingUrl: `https://${host}/t_ranking.php`,
  t_courseRankingUrl: `https://${host}/t_courseRanking.php`,
  submitUrl: `https://${host}/postarticle.php`,
  postUrl: `https://${host}/post.php`,
  deleteCommentUrl: `https://${host}/deletecomment.php`,
  GetMoreText: `https://${host}/getmoretext.php`,
  GetText: `https://${host}/gettext.php`,
  SeeLL: `https://${host}/seell.php`,
  WriteTime:`https://${host}/writetime.php`,
  Collection: `https://${host}/collection.php`,
  UnCollection:`https://${host}/uncollection.php`,
  Like:`https://${host}/like.php`,
  UnLike: `https://${host}/unlike.php`,
  Judge:`https://${host}/judge.php`,
  AddUser:`https://${host}/adduser.php`,
  GetOther:`https://${host}/getother.php`,
  GetCard:`https://${host}/getcard.php`,
  Save:`https://${host}/save.php`,
  GetMoreInfo: `https://${host}/getmoreinfo.php`,
  SendLiuYan: `https://${host}/sendliuyan.php`,
  ReadLiuYan:`https://${host}/readliuyan.php`,
  GetView: `https://${host}/getview.php`,
  GetOpenid: `https://${host}/openid.php`,
  UploadFile: `https://${host}/cos-php-sdk-v5/updata.php`,
  GetUse: `https://${host}/getuse.php`,
  t_learningTimeUrl: `https://${host}/t_learningTime.php`,
  SendDanmu: `https://${host}/senddanmu.php`,
  ReadDanmu: `https://${host}/readdanmulist.php`,
  GetStuInfoUrl: `https://${host}/getstuinfo.php`,
  GetDataUrl: `https://${host}/getdata.php`,
  getClasslist: `https://${host}/getclasslist.php`,
  setMust: `https://${host}/setmust.php`
};

module.exports = config