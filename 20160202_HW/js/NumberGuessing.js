var ran_num
var len
var g_arr

function intArray(n)
// 利用函數結構來建立陣列，n為陣列長度
{
    this.length = n
    for (var i = 0; i < this.length; i++)
        this[i] = 0
}

function printArray(msg, a) {
    document.write(msg)
    for (var i = 0; i < a.length; i++)
        document.write(a[i] + "-")
    document.write("<br>")
}

function initial()
//設定起始狀態
{
    len = 4
    ran_num = new intArray(len) // n個資料的陣列，存放電腦亂數產生的資料
    g_arr = new intArray(len) // 猜測的數字
    ran_num[0] = 5
    ran_num[1] = 6
    ran_num[2] = 7
    ran_num[3] = 8
}

function generate()
//亂數產生n位數，各個數字不重複
{
    ran_num[0] = Math.floor(Math.random() * 10)
    for (var i = 1; i < len; i++) {
        while (true) {
            r = Math.floor(Math.random() * 10)
            for (var j = 0; j < i; j++)
                if (r == ran_num[j])
                    break
            if (j == i) { // 未找到相同者
                ran_num[i] = r
                break // 跳離while
            }
        } // end of while
    } // end of for
    document.forma.c_num.value = "****"
        //  測試用資料
        //   ran_num[0]=5
        //   ran_num[1]=6
        //   ran_num[2]=7
        //   ran_num[3]=8
} // generate()函數結束

function guess() {
    var ans = "4A0B"
    var correct_pos = 0
    var incorrect_pos = 0
        //   printArray("third generated",this.ran_num)
        //   printArray("g_arr",g_arr)
    for (var i = 0; i < len; i++) {
        if (g_arr[i] == ran_num[i])
            correct_pos++
    }
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++)
            if (g_arr[i] == ran_num[j])
                incorrect_pos++
    }
    incorrect_pos -= correct_pos
    ans = correct_pos + "A" + incorrect_pos + "B"
    return ans
} // guess()函數結束

function calculate(f) {
    // f.g_num.value: 使用者所猜測的數字
    var v = ""
    v = f.g_num.value
    for (var i = 0; i < len; i++) {
        if ((v.charAt(i) > "9") || (v.charAt(i) < "0") || (v.length < len)) {
            //   if ((v != Math.ceil(v)) || (v.length < len)) {
            alert("輸入格式錯誤，請重新輸入")
            f.g_num.focus()
        }
    }
    for (var i = len - 1; i >= 0; i--) { //轉換為陣列，最右邊為個位數，
        //最左邊為位置0
        g_arr[i] = v % 10
        v = Math.floor(v / 10)
    }
    for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++)
            if (g_arr[i] == g_arr[j]) {
                alert("輸入數字不可重複，請重新輸入")
                f.g_num.focus()
            }
    }
    // 正確無誤
    f.result.value = guess()
    if (f.result.value.charAt(0) == len)
        alert("恭喜您！完全答對了")
} // calculate()函數結束
