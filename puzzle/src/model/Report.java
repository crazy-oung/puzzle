package model;

public class Report {
   private String memberId;
   private int count;
   private int timer;
   public String getMemberId() {
      return memberId;
   }
   public void setMemberId(String memberId) {
      this.memberId = memberId;
   }
   public int getCount() {
      return count;
   }
   public void setCount(int count) {
      this.count = count;
   }
   public int getTimer() {
      return timer;
   }
   public void setTimer(int timer) {
      this.timer = timer;
   }
   @Override
   public String toString() {
      return "Report [memberId=" + memberId + ", count=" + count + ", timer=" + timer + "]";
   }
   
   
}