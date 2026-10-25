/** 3 ví dụ ở 3 ngữ cảnh (lớp học · nhà · bạn bè/đời sống) cho từ lớp, kèm dịch Việt. Viết tay cho Zang. */
export type VocabExample = { en: string; vi: string; ctx: string };

const S = "Lớp học";
const H = "Ở nhà";
const F = "Bạn bè";

const E = (en: string, vi: string, ctx: string): VocabExample => ({ en, vi, ctx });

export const VOCAB_EXAMPLES: Record<string, VocabExample[]> = {
  quiet: [
    E("Please be quiet, the teacher is talking.", "Làm ơn giữ yên, cô đang giảng bài.", S),
    E("My house is quiet at night.", "Nhà tớ yên tĩnh vào ban đêm.", H),
    E("Linh is a quiet girl; she smiles more than she talks.", "Linh là đứa trầm, cười nhiều hơn nói.", F),
  ],
  loud: [
    E("The class is too loud today.", "Lớp hôm nay ồn quá.", S),
    E("Please turn down the TV; it is very loud.", "Vặn nhỏ tivi lại, to quá.", H),
    E("Khoa has a loud laugh; the whole street can hear it.", "Khoa cười to đến mức cả ngõ nghe thấy.", F),
  ],
  tall: [
    E("Minh is the tallest boy in our class.", "Minh là đứa cao nhất lớp tớ.", S),
    E("There is a tall tree in front of my house.", "Trước nhà tớ có một cây cao.", H),
    E("My brother is tall enough to reach the top shelf.", "Anh tớ cao đủ để với tới giá sách trên cùng.", F),
  ],
  short: [
    E("Our break is short, only five minutes.", "Giờ ra chơi ngắn thôi, có năm phút.", S),
    E("Mom cut her hair short last week.", "Tuần trước mẹ cắt tóc ngắn.", H),
    E("Hân Hân is short but she jumps very high.", "Hân Hân thấp nhưng nhảy rất cao.", F),
  ],
  thin: [
    E("This notebook is thin; I need a new one soon.", "Quyển vở này mỏng, sắp phải mua quyển mới.", S),
    E("Grandma is thin but she eats well.", "Bà gầy nhưng ăn khoẻ.", H),
    E("The cat next door was thin; now it is fat.", "Con mèo nhà cạnh trước gầy nhom, giờ mập rồi.", F),
  ],
  chubby: [
    E("The chubby boy in class five tells the best jokes.", "Cậu bé mũm mĩm lớp năm kể chuyện cười hay nhất.", S),
    E("My little sister has chubby cheeks.", "Em gái tớ có đôi má phúng phính.", H),
    E("Our chubby cat sleeps all day on the sofa.", "Con mèo mập nhà tớ ngủ cả ngày trên ghế.", F),
  ],
  shy: [
    E("Linh is too shy to read aloud in class.", "Linh ngại quá, không dám đọc to trước lớp.", S),
    E("The new puppy is shy and hides under the bed.", "Chú chó con nhút nhát, trốn dưới gầm giường.", H),
    E("Don't be shy; come and play with us.", "Đừng ngại, lại chơi cùng tụi tớ.", F),
  ],
  kind: [
    E("Our teacher is kind; she never shouts.", "Cô giáo tớ hiền lắm, chưa bao giờ quát.", S),
    E("It is kind of you to help grandma cook.", "Phụ bà nấu ăn là tốt bụng lắm.", H),
    E("A kind classmate shared her lunch with me.", "Một bạn tốt bụng chia cơm trưa cho tớ.", F),
  ],
  lazy: [
    E("Don't be lazy; finish your homework first.", "Đừng lười, làm xong bài tập đã.", S),
    E("On Sunday my dad is lazy and stays in bed.", "Chủ nhật bố tớ lười biếng, nằm ì trên giường.", H),
    E("The lazy dog does not want to walk.", "Con chó lười không chịu đi dạo.", F),
  ],
  messy: [
    E("Khoa's desk is messy; pens are everywhere.", "Bàn của Khoa bừa bộn, bút nằm lung tung.", S),
    E("My room is messy because I played all afternoon.", "Phòng tớ lộn xộn vì chơi cả chiều.", H),
    E("After the game, our hair was messy.", "Chơi xong, tóc tụi tớ rối bù.", F),
  ],
  tidy: [
    E("Linh keeps her notebook tidy and clean.", "Linh giữ vở gọn gàng sạch sẽ.", S),
    E("Mom is happy when the kitchen is tidy.", "Mẹ vui khi bếp gọn gàng.", H),
    E("A tidy bag helps you find your pen fast.", "Cặp sách ngăn nắp giúp tìm bút nhanh.", F),
  ],
  early: [
    E("I come to school early to read books.", "Tớ đến trường sớm để đọc sách.", S),
    E("Dad wakes up early to cook breakfast.", "Bố dậy sớm nấu bữa sáng.", H),
    E("The early bird catches the worm.", "Chim dậy sớm mới bắt được sâu.", F),
  ],
  late: [
    E("Khoa was late because he missed the bus.", "Khoa đi muộn vì lỡ xe buýt.", S),
    E("It is late; time to sleep, kids.", "Muộn rồi, đi ngủ thôi các con.", H),
    E("Better late than never — finish your drawing!", "Thà muộn còn hơn không — vẽ cho xong đi!", F),
  ],
  funny: [
    E("Our teacher tells funny stories in English.", "Cô giáo kể chuyện cười bằng tiếng Anh.", S),
    E("Grandpa makes funny faces at dinner.", "Ông hay làm mặt buồn cười lúc ăn tối.", H),
    E("The funny video made us laugh for ten minutes.", "Video hài khiến tụi tớ cười mười phút.", F),
  ],
  serious: [
    E("The teacher is serious when we forget homework.", "Cô nghiêm túc hẳn khi tụi tớ quên bài tập.", S),
    E("Dad has a serious face when he reads the news.", "Bố mặt nghiêm nghị khi đọc báo.", H),
    E("Stop laughing; this is a serious problem.", "Thôi cười đi, đây là vấn đề nghiêm túc đấy.", F),
  ],
  clever: [
    E("The clever girl solved the maths puzzle first.", "Bạn gái thông minh giải câu đố toán trước nhất.", S),
    E("Our clever parrot can say 'hello'.", "Con vẹt lanh lợi nhà tớ biết nói 'hello'.", H),
    E("That was a clever idea — hiding the gift in a box.", "Ý tưởng hay đấy — giấu quà trong hộp.", F),
  ],
  sleepy: [
    E("I feel sleepy after lunch at school.", "Sau bữa trưa ở trường tớ buồn ngủ.", S),
    E("The sleepy baby closed her eyes at eight.", "Em bé ngái ngủ nhắm mắt lúc tám giờ.", H),
    E("Zang was sleepy during the long film.", "Zang buồn ngủ suốt bộ phim dài.", F),
  ],
  hungry: [
    E("After PE, the whole class was hungry.", "Sau tiết thể dục, cả lớp đói bụng.", S),
    E("I am hungry; is dinner ready, Mom?", "Con đói rồi, cơm chưa mẹ ơi?", H),
    E("The hungry dog ate all the rice in one minute.", "Con chó đói ăn sạch cơm trong một phút.", F),
  ],
  tired: [
    E("We are tired after the long test.", "Tụi tớ mệt sau bài kiểm tra dài.", S),
    E("Mom looks tired after work.", "Mẹ trông mệt mỏi sau giờ làm.", H),
    E("Khoa was too tired to play football.", "Khoa mệt quá không đá bóng nổi.", F),
  ],
  bored: [
    E("The lesson was long and we felt bored.", "Bài học dài khiến tụi tớ thấy chán.", S),
    E("On rainy days, the kids get bored at home.", "Ngày mưa, tụi nhỏ ở nhà chán lắm.", H),
    E("I was bored, so I drew a dragon.", "Chán quá nên tớ vẽ con rồng.", F),
  ],
  nervous: [
    E("Linh was nervous before the spelling test.", "Linh hồi hộp trước bài kiểm tra chính tả.", S),
    E("I get nervous when the phone rings at night.", "Điện thoại reo lúc đêm khuya là tớ lo lắng.", H),
    E("Don't be nervous; just speak slowly.", "Đừng lo, cứ nói chậm lại thôi.", F),
  ],
  brave: [
    E("The brave boy spoke in front of the whole school.", "Cậu bé dũng cảm nói trước toàn trường.", S),
    E("Mom was brave when she caught the big spider.", "Mẹ gan dạ khi bắt con nhện to.", H),
    E("Be brave and say sorry first.", "Can đảm lên, xin lỗi trước đi.", F),
  ],
  friendly: [
    E("The new student is friendly to everyone.", "Bạn mới thân thiện với mọi người.", S),
    E("Our neighbours are friendly; they always say hello.", "Hàng xóm tớ hoà đồng, gặp là chào.", H),
    E("A friendly dog wagged its tail at us.", "Con chó thân thiện vẫy đuôi với tụi tớ.", F),
  ],
  polite: [
    E("A polite student says 'thank you' to the teacher.", "Học trò lễ phép biết nói 'cảm ơn cô'.", S),
    E("We are polite to grandma and grandpa.", "Tụi tớ lễ phép với ông bà.", H),
    E("It is polite to wait for your turn.", "Chờ tới lượt mình là lịch sự.", F),
  ],
  happy: [
    E("The class was happy when the test was easy.", "Cả lớp vui khi bài kiểm tra dễ.", S),
    E("Dad is happy when the garden has flowers.", "Bố vui khi vườn ra hoa.", H),
    E("Linh felt happy because Khoa shared his pen.", "Linh vui vì Khoa cho mượn bút.", F),
  ],
  sad: [
    E("Khoa was sad when he lost his eraser.", "Khoa buồn khi mất cục tẩy.", S),
    E("The sad puppy waited at the door all day.", "Chú chó buồn ngồi chờ ở cửa cả ngày.", H),
    E("Don't be sad; we can draw another picture.", "Đừng buồn, mình vẽ bức khác mà.", F),
  ],
  busy: [
    E("The teacher is busy marking our tests.", "Cô đang bận chấm bài cho tụi tớ.", S),
    E("Mom is busy cooking dinner at six.", "Sáu giờ mẹ bận nấu cơm tối.", H),
    E("The street is busy in the morning.", "Đường phố tấp nập vào buổi sáng.", F),
  ],
  free: [
    E("Are you free after school? Let's read comics.", "Tan học cậu rảnh không? Đọc truyện tranh đi.", S),
    E("On Saturday, Dad is free and plays chess with me.", "Thứ bảy bố rảnh, chơi cờ với tớ.", H),
    E("The museum is free for students.", "Bảo tàng miễn phí cho học sinh.", F),
  ],
  new: [
    E("We have a new English book this term.", "Học kỳ này tụi tớ có sách tiếng Anh mới.", S),
    E("Mom bought a new rice cooker yesterday.", "Hôm qua mẹ mua nồi cơm mới.", H),
    E("Khoa showed us his new football shoes.", "Khoa khoe đôi giày đá bóng mới.", F),
  ],
  old: [
    E("Our school is old but very beautiful.", "Trường tớ cũ nhưng rất đẹp.", S),
    E("Grandma keeps old photos in a wooden box.", "Bà giữ ảnh cũ trong hộp gỗ.", H),
    E("My old bike is slow, but I still love it.", "Xe đạp cũ của tớ chậm, nhưng tớ vẫn thích.", F),
  ],
  big: [
    E("Our classroom is big and full of light.", "Lớp học tớ rộng và đầy nắng.", S),
    E("We have a big mango tree behind the house.", "Sau nhà tớ có cây xoài to.", H),
    E("That is a big sandwich — can you finish it?", "Ổ bánh mì to thế — cậu ăn hết nổi không?", F),
  ],
  small: [
    E("Linh writes small letters, very tidy.", "Linh viết chữ nhỏ, rất gọn.", S),
    E("My small brother sleeps with a toy bear.", "Em nhỏ nhà tớ ngủ ôm gấu bông.", H),
    E("A small gift can make a friend smile.", "Món quà nhỏ cũng đủ làm bạn cười.", F),
  ],
  clean: [
    E("Keep your desk clean, please.", "Giữ bàn sạch sẽ nhé.", S),
    E("Mom asks me to keep my room clean.", "Mẹ bảo tớ giữ phòng sạch sẽ.", H),
    E("Wash your hands clean before lunch.", "Rửa tay sạch trước khi ăn trưa.", F),
  ],
  dirty: [
    E("Khoa's shoes are dirty after football.", "Giày Khoa bẩn hết sau trận bóng.", S),
    E("The dirty plates are in the sink.", "Mấy cái đĩa bẩn để trong bồn rửa.", H),
    E("Don't touch the dirty water in the street.", "Đừng đụng vào vũng nước bẩn ngoài đường.", F),
  ],
  strong: [
    E("The strong wind closed our classroom window.", "Gió mạnh đóng sập cửa sổ lớp.", S),
    E("Dad is strong; he carries two heavy bags.", "Bố khoẻ lắm, xách được hai túi nặng.", H),
    E("A strong team wins because they help each other.", "Đội mạnh thắng vì các bạn giúp nhau.", F),
  ],
  weak: [
    E("I am weak at spelling, so I practise every day.", "Tớ yếu chính tả nên luyện mỗi ngày.", S),
    E("The weak old chair broke when Dad sat down.", "Cái ghế cũ yếu gãy khi bố ngồi xuống.", H),
    E("The kitten was weak, so we gave it warm milk.", "Mèo con yếu ớt nên tụi tớ cho uống sữa ấm.", F),
  ],
  fast: [
    E("Minh runs fast; he wins every race.", "Minh chạy nhanh, cuộc đua nào cũng thắng.", S),
    E("The train is fast; we arrive in one hour.", "Tàu chạy nhanh, một tiếng là tới.", H),
    E("Don't eat too fast, Khoa!", "Đừng ăn nhanh quá, Khoa!", F),
  ],
  slow: [
    E("The slow turtle finally reached the finish line.", "Con rùa chậm chạp cuối cùng cũng về đích.", S),
    E("Our old fan is slow on hot days.", "Cái quạt cũ quay chậm vào ngày nóng.", H),
    E("Slow and steady wins the race.", "Chậm mà chắc thắng cuộc đua.", F),
  ],
  warm: [
    E("Keep your jacket on; stay warm in class.", "Mặc áo khoác vào, giữ ấm trong lớp.", S),
    E("Mom makes warm soup on cold nights.", "Tối lạnh mẹ nấu canh ấm.", H),
    E("A warm smile makes new friends.", "Nụ cười ấm áp giúp kết bạn mới.", F),
  ],
  cold: [
    E("The classroom is cold this morning.", "Sáng nay lớp học lạnh.", S),
    E("Drink warm water; the night is cold.", "Uống nước ấm đi, đêm lạnh lắm.", H),
    E("My hands are cold after playing in the rain.", "Tay tớ lạnh ngắt sau khi chơi dưới mưa.", F),
  ],
  classmate: [
    E("My classmate Linh sits next to me.", "Bạn cùng lớp Linh ngồi cạnh tớ.", S),
    E("A classmate visited me when I was sick.", "Có bạn cùng lớp tới thăm lúc tớ ốm.", H),
    E("A good classmate shares, not fights.", "Bạn cùng lớp tốt thì chia sẻ, không cãi nhau.", F),
  ],
  desk: [
    E("Put your books on the desk.", "Đặt sách lên bàn đi.", S),
    E("My desk at home is near the window.", "Bàn học ở nhà tớ đặt cạnh cửa sổ.", H),
    E("Khoa keeps a lucky stone on his desk.", "Khoa giữ viên đá may mắn trên bàn.", F),
  ],
  bag: [
    E("My bag is heavy today — too many books.", "Hôm nay cặp tớ nặng, nhiều sách quá.", S),
    E("Mom's bag has everything, even candy.", "Túi của mẹ có đủ thứ, cả kẹo nữa.", H),
    E("Linh's pink bag is easy to find.", "Cái cặp hồng của Linh dễ tìm lắm.", F),
  ],
  notebook: [
    E("Write the new words in your notebook.", "Viết từ mới vào vở đi.", S),
    E("I keep a small notebook by my bed.", "Tớ để quyển sổ nhỏ cạnh giường.", H),
    E("Linh's notebook has cute stickers on every page.", "Vở của Linh trang nào cũng có nhãn dán xinh.", F),
  ],
  pen: [
    E("May I borrow a pen, please?", "Cho tớ mượn cây bút được không?", S),
    E("Dad's old pen writes very smoothly.", "Cây bút cũ của bố viết trơn lắm.", H),
    E("Khoa lost his blue pen again!", "Khoa lại làm mất bút xanh rồi!", F),
  ],
  teacher: [
    E("Our teacher reads stories after lunch.", "Cô giáo đọc truyện cho nghe sau bữa trưa.", S),
    E("My aunt is a teacher in Da Nang.", "Dì tớ là giáo viên ở Đà Nẵng.", H),
    E("A good teacher makes hard things easy.", "Thầy cô giỏi biến điều khó thành dễ.", F),
  ],
  break: [
    E("At break, we run to the playground.", "Giờ ra chơi, tụi tớ chạy ra sân.", S),
    E("Dad takes a break and drinks tea at three.", "Ba giờ bố nghỉ giải lao uống trà.", H),
    E("Take a break; your eyes need rest.", "Nghỉ một chút đi, mắt cần nghỉ.", F),
  ],
  lunch: [
    E("We have lunch at school at eleven.", "Mười một giờ tụi tớ ăn trưa ở trường.", S),
    E("Mom packs my lunch in a small box.", "Mẹ gói cơm trưa cho tớ trong hộp nhỏ.", H),
    E("Khoa shared his lunch with Linh today.", "Hôm nay Khoa chia cơm trưa cho Linh.", F),
  ],
  umbrella: [
    E("Take an umbrella; the sky looks dark.", "Mang ô đi, trời âm u rồi.", S),
    E("Our big umbrella is enough for three kids.", "Cái ô to nhà tớ che đủ ba đứa.", H),
    E("Linh forgot her umbrella, so we walked together.", "Linh quên ô nên tụi tớ đi chung.", F),
  ],
  jacket: [
    E("Hang your jacket on the chair.", "Treo áo khoác lên ghế đi.", S),
    E("Dad's old jacket is twenty years old.", "Cái áo khoác cũ của bố hai mươi năm tuổi rồi.", H),
    E("Khoa's new jacket has ten pockets!", "Áo khoác mới của Khoa có mười cái túi!", F),
  ],
  glasses: [
    E("Our teacher wears glasses when she reads.", "Cô giáo đeo kính khi đọc sách.", S),
    E("Grandpa looks for his glasses every morning.", "Sáng nào ông cũng đi tìm kính.", H),
    E("Linh's new glasses are pink.", "Kính mới của Linh màu hồng.", F),
  ],
  smile: [
    E("The teacher's smile makes Monday better.", "Nụ cười của cô khiến thứ hai dễ chịu hơn.", S),
    E("Mom's smile welcomes me home.", "Nụ cười của mẹ đón tớ về nhà.", H),
    E("Smile! I am taking a photo.", "Cười lên! Tớ chụp ảnh nè.", F),
  ],
  voice: [
    E("Read with a strong voice, Zang.", "Đọc giọng to vào, Zang.", S),
    E("Grandma's voice is soft and warm.", "Giọng bà nhẹ nhàng ấm áp.", H),
    E("Khoa has a loud voice in every game.", "Khoa giọng to trong mọi trò chơi.", F),
  ],
  seat: [
    E("My seat is near the window.", "Chỗ ngồi của tớ cạnh cửa sổ.", S),
    E("Grandma's seat is the soft sofa.", "Chỗ của bà là chiếc ghế sofa êm.", H),
    E("Save a seat for me at the cinema!", "Giữ chỗ cho tớ ở rạp nhé!", F),
  ],
  window: [
    E("Open the window, please; it is hot.", "Mở cửa sổ ra, nóng quá.", S),
    E("Rain is hitting my bedroom window.", "Mưa đang gõ vào cửa sổ phòng tớ.", H),
    E("The cat sits by the window all day.", "Con mèo ngồi cạnh cửa sổ cả ngày.", F),
  ],
  phone: [
    E("The teacher's phone rang during the test.", "Điện thoại cô reo giữa giờ kiểm tra.", S),
    E("Mom talks on the phone with grandma every night.", "Tối nào mẹ cũng gọi điện cho bà.", H),
    E("Don't play phone games before homework.", "Đừng chơi điện thoại trước khi làm bài.", F),
  ],
  homework: [
    E("Finish your homework before dinner.", "Làm xong bài tập trước bữa tối.", S),
    E("I do my homework at the kitchen table.", "Tớ làm bài tập ở bàn bếp.", H),
    E("Khoa forgot his homework again — oh no!", "Khoa lại quên bài tập rồi — ôi không!", F),
  ],
  library: [
    E("Our library has one thousand books.", "Thư viện trường tớ có một nghìn quyển sách.", S),
    E("The city library is near my house.", "Thư viện thành phố gần nhà tớ.", H),
    E("Be quiet in the library, please.", "Giữ yên trong thư viện nhé.", F),
  ],
  gate: [
    E("Wait for your mom at the school gate.", "Đợi mẹ ở cổng trường nhé.", S),
    E("Our gate is blue and very old.", "Cổng nhà tớ màu xanh, cũ lắm rồi.", H),
    E("Khoa was late; the gate was already closed.", "Khoa tới muộn, cổng đã đóng.", F),
  ],
  rain: [
    E("The rain stopped before the bell rang.", "Mưa tạnh trước khi chuông reo.", S),
    E("I like listening to the rain at night.", "Tớ thích nghe mưa rơi ban đêm.", H),
    E("We jumped in the rain and got wet.", "Tụi tớ nhảy dưới mưa, ướt hết.", F),
  ],
  sit: [
    E("Sit down and open your books.", "Ngồi xuống và mở sách ra.", S),
    E("We sit together for dinner at seven.", "Bảy giờ cả nhà ngồi ăn tối cùng nhau.", H),
    E("Sit next to me at the show!", "Ngồi cạnh tớ lúc xem kịch nhé!", F),
  ],
  stand: [
    E("Stand up when the teacher comes in.", "Đứng dậy khi cô vào lớp.", S),
    E("Mom makes me stand straight for photos.", "Mẹ bắt tớ đứng thẳng khi chụp ảnh.", H),
    E("We stood in line for ice cream.", "Tụi tớ đứng xếp hàng mua kem.", F),
  ],
  talk: [
    E("Don't talk during the test.", "Không nói chuyện trong giờ kiểm tra.", S),
    E("We talk about our day at dinner.", "Cả nhà kể chuyện trong ngày lúc ăn tối.", H),
    E("Linh and Khoa talk about football every break.", "Linh với Khoa bàn chuyện bóng đá mỗi giờ ra chơi.", F),
  ],
  listen: [
    E("Listen carefully; the story is short.", "Nghe kỹ nhé, truyện ngắn thôi.", S),
    E("I listen to songs before sleep.", "Trước khi ngủ tớ nghe nhạc.", H),
    E("A good friend listens more than he talks.", "Bạn tốt nghe nhiều hơn nói.", F),
  ],
  write: [
    E("Write your name at the top of the page.", "Viết tên lên đầu trang giấy.", S),
    E("Grandma writes letters to her old friends.", "Bà viết thư cho mấy người bạn già.", H),
    E("Zang writes one sentence every day.", "Zang viết một câu mỗi ngày.", F),
  ],
  read: [
    E("Read the story again at home.", "Về nhà đọc lại truyện nhé.", S),
    E("Dad reads the news every morning.", "Sáng nào bố cũng đọc báo.", H),
    E("Linh reads one book every week.", "Linh đọc một cuốn sách mỗi tuần.", F),
  ],
  draw: [
    E("Draw a picture of your family.", "Vẽ tranh gia đình em đi.", S),
    E("I draw cats on the last page of my notebook.", "Tớ vẽ mèo ở trang cuối quyển vở.", H),
    E("Khoa draws dragons better than anyone.", "Khoa vẽ rồng đẹp hơn ai hết.", F),
  ],
  share: [
    E("Share your crayons with your classmate.", "Chia sẻ bút màu với bạn cùng lớp.", S),
    E("We share one big pizza on Friday.", "Thứ sáu cả nhà chia nhau một cái pizza to.", H),
    E("Sharing toys makes playtime more fun.", "Chia sẻ đồ chơi khiến giờ chơi vui hơn.", F),
  ],
  wait: [
    E("Wait for the bell before you run out.", "Đợi chuông reo rồi hãy chạy ra.", S),
    E("Dinner is almost ready; wait five minutes.", "Cơm gần xong, đợi năm phút nữa.", H),
    E("I waited for Khoa at the gate for ten minutes.", "Tớ đợi Khoa ở cổng mười phút.", F),
  ],
  walk: [
    E("Walk slowly in the hallway.", "Đi chậm lại trong hành lang.", S),
    E("We walk the dog every evening.", "Tối nào tụi tớ cũng dắt chó đi dạo.", H),
    E("Linh and I walk home together.", "Linh và tớ đi bộ về nhà cùng nhau.", F),
  ],
  laugh: [
    E("The whole class laughed at the funny story.", "Cả lớp cười vì câu chuyện hài.", S),
    E("Grandpa laughs loudly at his own jokes.", "Ông cười to với chính trò đùa của mình.", H),
    E("We laughed until our bellies hurt.", "Tụi tớ cười đến đau bụng.", F),
  ],
  forget: [
    E("Don't forget your homework tomorrow.", "Đừng quên bài tập ngày mai nhé.", S),
    E("Dad forgot his keys again this morning.", "Sáng nay bố lại quên chìa khoá.", H),
    E("I will never forget our first football win.", "Tớ sẽ không bao giờ quên trận thắng đầu tiên.", F),
  ],
  bring: [
    E("Bring your English book tomorrow.", "Mai mang sách tiếng Anh nhé.", S),
    E("Mom brings fruit when she comes home.", "Mẹ đi chợ về mang theo trái cây.", H),
    E("Khoa brought cookies for the whole class.", "Khoa mang bánh quy cho cả lớp.", F),
  ],
  wear: [
    E("Wear your uniform on Monday.", "Thứ hai mặc đồng phục nhé.", S),
    E("Grandma wears a warm hat in winter.", "Mùa đông bà đội mũ len ấm.", H),
    E("Khoa wears his lucky shirt to every match.", "Khoa mặc áo may mắn đi mọi trận bóng.", F),
  ],
  always: [
    E("Linh always finishes her homework early.", "Linh lúc nào cũng làm bài tập xong sớm.", S),
    E("Dad always drinks coffee at six.", "Bố lúc nào cũng uống cà phê lúc sáu giờ.", H),
    E("Khoa always forgets something — today, his hat!", "Khoa lúc nào cũng quên gì đó — hôm nay là mũ!", F),
  ],
  often: [
    E("We often play word games in English class.", "Tụi tớ thường chơi trò từ vựng trong giờ tiếng Anh.", S),
    E("Our family often eats noodles on Sunday.", "Chủ nhật nhà tớ thường ăn phở.", H),
    E("Khoa often tells stories about his dog.", "Khoa hay kể chuyện về con chó của cậu ấy.", F),
  ],
  never: [
    E("Linh never comes late to class.", "Linh chưa bao giờ đi học muộn.", S),
    E("Our cat never sleeps at night.", "Con mèo nhà tớ đêm không bao giờ ngủ.", H),
    E("Never give up — try one more time!", "Đừng bao giờ bỏ cuộc — thử thêm lần nữa!", F),
  ],
  together: [
    E("We read the story together, one page each.", "Tụi tớ đọc truyện cùng nhau, mỗi đứa một trang.", S),
    E("Our family cooks dinner together on Sunday.", "Chủ nhật cả nhà nấu cơm tối cùng nhau.", H),
    E("Together, we built the tallest block tower.", "Cùng nhau, tụi tớ xếp được tháp cao nhất.", F),
  ],
  quietly: [
    E("Talk quietly; other classes are studying.", "Nói khẽ thôi, các lớp khác đang học.", S),
    E("The baby is sleeping, so walk quietly.", "Em bé đang ngủ, đi khẽ thôi.", H),
    E("Linh quietly gave me the answer in a note.", "Linh lặng lẽ gửi đáp án cho tớ qua mẩu giấy.", F),
  ],
  slowly: [
    E("Read slowly and the words become clear.", "Đọc chậm lại thì chữ sẽ rõ.", S),
    E("Grandpa walks slowly in the garden.", "Ông đi chậm rãi trong vườn.", H),
    E("The snail moved slowly across the leaf.", "Con ốc bò chậm chạp qua chiếc lá.", F),
  ],
  // từ truyện & từ hay gặp ngoài CLASS_WORDS
  tiny: [
    E("A tiny ant is on my desk.", "Một con kiến tí hon đang ở trên bàn tớ.", S),
    E("The tiny kitten fits in my hand.", "Con mèo con tí xíu nằm gọn trong tay tớ.", H),
    E("Tiny and hungry sat at the same desk.", "Tiny và hungry ngồi chung một bàn.", F),
  ],
  cucumber: [
    E("There is a cucumber in my lunch box.", "Trong hộp cơm tớ có quả dưa leo.", S),
    E("Mom cuts cucumber for dinner.", "Mẹ thái dưa leo cho bữa tối.", H),
    E("Khoa hates cucumber but loves pickles!", "Khoa ghét dưa leo nhưng mê dưa chua!", F),
  ],
  "lunch box": [
    E("Open your lunch box quietly, please.", "Mở hộp cơm khẽ thôi nhé.", S),
    E("Mom washes my lunch box every night.", "Tối nào mẹ cũng rửa hộp cơm cho tớ.", H),
    E("Khoa's lunch box had only cucumbers today!", "Hôm nay hộp cơm của Khoa toàn dưa leo!", F),
  ],
  "boxed meal": [
    E("On the school trip, we each got a boxed meal.", "Đi dã ngoại, mỗi đứa được một suất cơm hộp.", S),
    E("Dad bought a boxed meal from the shop.", "Bố mua một suất ăn đóng hộp ở cửa hàng.", H),
    E("The boxed meal had rice, chicken, and a tiny cake.", "Suất cơm hộp có cơm, gà và một cái bánh tí hon.", F),
  ],
};

/** Trả 3 ví dụ 3 ngữ cảnh nếu có; nếu không, trả về null (để UI fallback ví dụ gốc + từ điển). */
export function examplesOf(word: string): VocabExample[] | null {
  return VOCAB_EXAMPLES[word.trim().toLowerCase()] ?? null;
}
