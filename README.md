# React - To-Do List

### React와 Drag & Drop 기능을 사용한 To-Do List 사이드 프로젝트입니다.

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Styled&dash;Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/> <img src="https://img.shields.io/badge/React&dash;Hook&dash;Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/>  
<img src="https://img.shields.io/badge/Recoil&dash;Persist-3578E5?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/@hello&dash;pangea/dnd-0BAF7C?style=flat-square&logoColor=white"/>

---

- **23-08-30 : #6.0 ~ #6.4 / Recoil Atom**
  - Recoil
    - React에서 사용할 수 있는 상태 관리(state management) 라이브러리
    - 설치법 : 'npm i recoil'
    - 설정법 : 'index.tsx'에서 &lt;RecoilRoot&gt;로 앱을 감싸주기
  - atom : 특정 컴포넌트에 종속되지 않으며, global state를 저장하는 기본 단위
    - Recoil에서는 state값을 'atom'이라는 버블에 담아서 사용
    - atom이 변경되면 컴포넌트도 변경된 값으로 re-rendering 됨
    - 사용법
      1. 'atom'을 관리하는 파일 생성하기
         - '/src/atoms.ts'
      2. 'atom' 생성하기
         - import { atom } from "recoil";
         - 기본형 : export const 변수명 = atom({ key: 키값, default: 초기값});
      3. [Read] 다른 컴포넌트에서 'atom' 연결하기
         - 기본형 : const 변수명 = useRecoilValue(아톰명);
      4. [Write] 다른 컴포넌트에서 'atom' 수정하기
         - 기본형 : const Setter함수 = useRecoilState(아톰명);
         - 'useState()'처럼 사용하면 됨
- **23-08-31 : #6.5 ~ #6.7 / React-Hook-Form(1)**
  - React Hook Form
    - React에서 &lt;form&gt;을 간단하게 제작할 수 있게 도와주며, 검증까지 할 수 있는 패키지
      - 기존 React에서 &lt;form&gt; 제작 시 setState(), value, onChange, onSubmit 등을 사용해야 했음
    - 설치법 : 'npm i react-hook-form'
    - 기본형
      - import { useForm} from "react-hook-form";
      - const { register, watch, handleSubmit, formState 등 } = useForm&lt;제네릭&gt;();
    - register : &lt;input&gt;의 value와 onChange를 대체하는 속성
      - name, onBlur, onChange, ref 등을 가지는 object를 return하는 함수
      - 사용법 : &lt;input {...register(이름, {검증 속성})} /&gt;
        - ES6 문법을 사용해 register 함수가 반환하는 객체를 가져다가 props로 사용
        - HTML 뿐만아니라 JS에서도 검증을 할 수 있도록 함
          - 유효하지 않을 시 자동으로 해당 element로 focus 해줌
      - ex. &lt;input {...register("email", { required: true, minLength: 10 })} placeholder="Email" /&gt;
    - handleSubmit : &lt;form&gt;의 'onSubmit'을 대체하고, validation을 담당함
      - 기존 onSubmit의 'event.preventDefault()와 setModifier함수'를 대체
      - 사용법 : &lt;form onSubmit={handleSubmit(데이터 유효 시 호출함수, ?데이터 무효 시 호출 함수)}&gt;
    - watch : &lt;form&gt;의 입력값들의 변화를 관찰할 수 있게 해주는 함수
      - register함수를 사용하는 모든 element들의 값을 object로 반환
      - ex. console.log(watch());
    - formState : 데이터 검증이 유효하지 않을 시 'formState.errors'를 참조해 error 내용 확인 가능
      - 어떤 종류의 error가 발생했는지 알 수 있음
      - error 발생 시 message를 보낼 수 있음
      - ex. &lt;input {...register("pw", {
        required: "PW is Required",
        minLength: { value: 5, message: "Your PW is too short" }})} /&gt;
- **23-09-02 : #6.8 ~ #6.10 / React-Hook-Form(2)**
  - React-Hook-Form
    - React-Hook-Form에서는 register 사용 시 문자열을 return 하면, error 메시지를 return한다는 뜻
    - setValue : 필드 값을 업데이트하는 함수
      - 기본형 : const { setValue } = useForm();
      - 사용법 : setValue(이름, 필드값);
    - reset : &lt;form&gt;의 모든 필드값을 초기화하는 함수
      - 기본형 : const { reset } = useForm();
      - 사용법 : reset();
  - React-Hook-Form - 검증
    - 검증 시 정규식(Regular Expression)을 사용할 수 있음 : 'pattern' 프로퍼티 사용
    - 검증 조건마다 message를 적어놨다면, error 문구를 화면에 출력 가능
      - 사용자가 제출한 이후에는 message가 실시간으로 변함
      - 'useForm()'에 제네릭을 명시하지 않았을시 string으로 타입을 명시해주어야 함 (as string)
  - React-Hook-Form - 커스텀 검증
    - 'handleSubmit()'의 인자로 사용하는 콜백함수에 커스텀 검증이 가능함
    - 검증 콜백함수의 매개변수는 자동으로 &lt;form&gt;의 element들을 받음
      - 해당 매개변수의 프로퍼티를 사용
    - useForm()의 'setError' 프로퍼티는 특정한 error를 발생시켜 줌
      - 기본형 : setError(레지스터명, { message: 에러메시지 });
      - interface에 옵션 항목을 넣어서, 추가적인 error를 표기할 수 있음
      - &lt;form&gt;에서 자동으로 error 항목으로 focus되게 할 수 있음
        - setError()의 3번째 매개변수로 '{ shouldFocus: true }'를 부여하여 작동
    - register의 검증 속성들 중 'validate' 옵션을 사용해 커스텀 규칙을 검사할 수 있음
      - validate : 현재 value값을 인자로 받는 콜백함수를 값으로 가지며, boolean값을 반환함 (검증을 통과/불통과)
      - 삼항조건연산자(또는 ||)를 사용해 error 메시지를 return 하도록 함
      - 여러 함수(검증)가 있는 object 형태가 될 수 있음
      - async 비동기로 만들어서 서버에다가 확인하고 응답을 받을 수 있음
- **23-09-04 : #6.11 ~ #6.15 / To-Do List**
  - Recoil - useRecoilState()
    - atom을 'useState()'처럼 사용하는 메서드
      - 'useRecoilValue()'와 'useSetRecoilState()'를 따로 사용할 필요가 없음
    - 기본형 : const [값, 세터함수] = useRecoilState(아톰명);
  - 매개변수를 가지는 Event Listener 사용법
    1. element에서 event를 익명함수를 사용해 매개변수를 전달하는 방법
       - ex.
         const onClick = (newCategory: IToDo["category"]) => {
         &nbsp;&nbsp;console.log("I wanna to", newCategory);
         };
         &lt;button onClick={() => onClick("DOING")}&gt;Doing&lt;/button&gt;
    2. element의 name 속성을 활용하는 방법
    - 'name' 속성에 직접 타입을 줄 수 없기 때문에, 1번 방법을 선호
    - ex.
      const onClick = (event: React.MouseEvent&lt;HTMLButtonElement&gt;) => {
      &nbsp;&nbsp;console.log("I wanna to", <span>event.currentTarget.name</span>);
      };
      &lt;button name="DOING" onClick={onClick}&gt;Doing&lt;/button&gt;
  - To-Do List에서 하나의 to-do를 수정하는 방법
    - 배열을 mutate하지 않으면서, 'useSetRecoilState()'로 원하는 하나의 값을 수정해야 함
    1. 'id' 등의 속성을 사용하여, 배열 속 원하는 element의 index 찾기
       - 값 자체를 찾을 필요는 없고, 배열 index값만 알면 됨
       - 배열의 '.findIndex(콜백함수)' 메서드를 사용해 조건에 맞는 index를 알아냄
    2. element를 업데이트하기
       - 찾은 index에 대한 element를 새로운 값으로 대체(replace)해야 함
       - element를 교체하는 이유는 해당 element의 위치가 바뀌지 않길 바라기 때문
       1. 교체할 element의 앞 부분을 새로운 배열로 생성하기
          - '.slice(시작인덱스, 끝인덱스)' 메서드를 사용해 새로운 배열 생성
       2. 교체할 element의 뒷 부분을 새로운 배열로 생성하기
          - '.slice()' 메서드의 끝인덱스를 지정하지 않을 시 끝까지 잘라서 반환함
       3. 교체 후 새로운 배열로 생성하기
          - 배열의 스프레드 연산자(...)를 이용하여, 앞부분과 뒷부분 사이에 새 원소를 넣음
- **23-09-05 : #6.16 ~ #7.1 / Recoil Selector + Recoil-Persist**
  - Recoil - Selector
    - atom의 output을 변형시키는 도구 (atom의 state 자체를 바꾸는 것이 아니라, 그의 output을 바꾸는 것)
    - 선언법
      const 셀렉터명 = selector({
      &nbsp;&nbsp;key: 키값,
      &nbsp;&nbsp;get: ({ get }) => {
      &nbsp;&nbsp;&nbsp;&nbsp;const 변수명 = get(아톰명); // atom을 가져오는 문 (필수x)
      &nbsp;&nbsp;&nbsp;&nbsp;......
      &nbsp;&nbsp;&nbsp;&nbsp;return 값;
      &nbsp;&nbsp;},
      });
      - get
        - 인자로 받는 옵션 중의 'get'함수를 이용해 atom을 받아올 수 있으며, 여러 번 사용해 여러 개의 atom을 가져올 수 있음
        - return하는 값은 해당 selector의 value가 됨
    - 사용법 : const 변수명 = useRecoilValue(셀렉터명);
    - atom이 변하면, selector도 변함
  - Recoil - Selector의 'set' 속성
    - selector의 'set' 속성을 사용하여, selector에서 atom의 state를 수정할 수 있음
    - 기본형
      &nbsp;&nbsp;set: ({ set }, 새로운값) => {
      &nbsp;&nbsp;......
      &nbsp;&nbsp;set(아톰명, 수정할값); // 새로운 값과 수정할 값은 같을 필요 x
      }
      - 여러 개의 atom에 대해 'set()'함수를 사용할 수 있음
    - 'useRecoilState()'로 selector를 불러와서 사용할 수 있음
      - 첫 번째 요소 : get 프로퍼티로부터 return한 값
      - 두 번째 요소 : set 프로퍼티로를 실행시키는 함수
      - 'useRecoilState()'를 atom과 selector 둘다에서 사용 가능
  - enum
    - 열거형(enumeration)으로 정의하는 데 사용하는 데이터 형식
    - 기본형: enum 변수명 { 값1, 값2, 값3, ... }
      - 변수명은 대문자로 시작
      - 컴퓨터는 열거 상수로 사용함
        - 열거 상수는 0부터 시작하여 순서대로 1씩 증가한 값을 가지며, 순서를 따로 지정하지 않는 한 자동으로 할당됨 (수동 할당 가능, 숫자나 문자열 가능)
        - 직접 같은 값으로 주어서 사용할 수 있음
          (ex. enum Categories { "TO_DO" = "TO_DO" })
    - 사용 시 프로퍼티 방식으로 사용
      (ex. Categories.TO_DO)
  - Recoil-Persist 패키지
    - Recoil 상태 관리 라이브러리와 Local Storage를 통합하여, Recoil 상태를 영구적으로 저장하고 복원하는 데 도움을 주는 패키지
      - 브라우저의 Local Storage를 활용하여, Recoil 상태를 지속적으로 유지할 수 있음
    - 설치법 : 'npm i recoil-persist'
    - 설정법
      1. atom 파일에서 'recoilPersist' 객체 생성하기
         - const { persistAtom } = recoilPersist();
           - 'recoilPersist()'의 옵션
             - key : Local Storage에 데이터 저장 시 사용되는 key명
               - 기본값 : "recoil-persist"
             - storage : 데이터를 저장할 저장소 설정
               - 기본값 : localStorage
             - converter : 저장소에서 값을 직렬화/역직렬화하는 방법을 구성
               - 기본값 : JSON
      2. Local Storage를 사용하고자 하는 atom에 'effect_UNSTABLE' 속성 할당하기
         - 'effect_UNSTABLE: [persistAtom]' 속성만 추가하면 됨
    - 설정만 해놓으면 Local Storage에 저장(set)과 불러오기(get)를 자동으로 실행함
- **23-09-06 : #7.2 ~ #7.4 / React-Beautiful-Dnd(1)**
  - react-beautiful-dnd 패키지 (@hello-pangea/dnd)
    - 화면에서 drag&drop을 할 수 있게 해주는 패키지
    - 설치법 : 'npm i @hello-pangea/dnd'
      - 'react-beautiful-dnd'는 종속성 문제때문에 React 18버전에서 제대로 동작하지 않고, 해당 패키지가 더 이상 없뎃이므로 비추천
    - 웹 페이지에서 작동이 되지 않을 시 'React.StrictMode'를 제거할 것
  - &lt;DragDropContext /&gt;
    - drag&drop을 가능하게 하고 싶은 앱의 한 부분(영역)
      - 앱 전체가 아닌 사용자가 drag&drop을 할 특정 영역에만 생성하도록 함
    - 기본형 : &lt;DragDropContext onDragEnd={콜백함수}&gt; ... &lt;/DragDropContext&gt;
      - onDragEnd : [필수] 사용자가 drag를 끝낸 시점에 실행하는 콜백함수
        - 콜백함수에 내용이 없다면, drag&drop이 끝날 시 원래대로 돌아옴
      - [필수] 태그 사이에는 children(하위 태그)이 있어야 함
  - &lt;Droppable /&gt;
    - 어떤 것을 드롭할 수 있는 영역(list)
    - 기본형 : &lt;Droppable droppableId="이름"&gt; ... &lt;/Droppable&gt;
      - droppableId : [필수] drop할 수 있는 영역이 여러 개일 수 있기 때문
      - [필수] 태그 사이에는 children(콜백함수 JSX)이 있어야 함
        - 콜백함수의 첫 번째 인자로 'provided'를 받음 (위치만 중요하지, 이름은 아무거나 가능)
        - 콜백함수에서 사용되는 JSX에 'provided.droppableProps'의 모든 프로퍼티와 'ref'속성으로 'provided.innerRef'를 주어야 함
        - ex. {(provided) => &lt;ul ref={provided.innerRef} {...provided.droppableProps}&gt; ... &lt;/ul&gt;}
    - 'provided.placeholder' : &lt;/Droppable&gt;이 끝날 때 두어, drag&drop 시 &lt;Droppable&gt;의 사이즈가 이상하게 변하는 것을 막음
      - &lt;Droppable&gt;의 하위 콜백함수에서 사용된 JSX의 닫힌 태그 바로 앞에서 사용
  - &lt;Draggable /&gt;
    - 사용자가 drag할 수 있는 영역(list에 있는 item)
    - 기본형 : &lt;Draggable draggableId="이름" index={인덱스}&gt; ...... &lt;/Draggable&gt;
      - draggableId : [필수] drop할 수 있는 영역이 여러 개일 수 있기 때문
        - 'key'속성 사용 시 'draggableId'의 속성값과 같아야 함 (drag&drop 할 수 있기 때문)
      - index : [필수] sorting을 위한 프로퍼티
      - [필수] 태그 사이에는 children(콜백함수 JSX)이 있어야 함
        - 콜백함수의 첫 번째 인자로 'provided'를 받음 (위치만 중요하지, 이름은 아무거나 가능)
        - provided.draggableProps : 해당 element의 drag 기능
        - provided.dragHandleProps : drag하기 위해 잡을 수 있는 영역
          - 해당 프로퍼티를 준 element를 drag 해야함
        - 콜백함수에서 사용되는 JSX에 'provided.draggableProps'의 모든 프로퍼티와 'provided.dragHandleProps'의 모든 프로퍼티와 'ref'속성으로 'provided.innerRef'를 주어야 함
        - ex. {(provided) =>
          &lt;li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}&gt; ...... &lt;/li&gt;}
- **23-09-07 : #7.5 ~ #7.11 / React-Beautiful-Dnd(2)**
  - &lt;DragDropContext&gt; - 'onDragEnd'
    - 'onDragEnd' 프로퍼티는 drag&drop이 끝날 때 실행하는 함수
    - 어떤 일이 일어났는지에 대한 정보를 담고있는 argument를 제공함
      - 'onDragEnd'의 인자의 타입은 'DropResult' (타입 문서 참조)
      - draggableId : drag&drop을 한 element를 알려줌
      - destination : 목적지의 정보 { droppableId, index }
      - source : 출발지의 정보 { droppableId, index }
    - drag&drop을 한 element를 저장한 배열에서도 똑같이 만들어주어야 함
      1. 배열에서 drag한 element를 삭제하기
         - 'source.index'를 참조해 삭제
         - 배열.splice(시작인덱스, 삭제할갯수) : 해당 item을 배열에서 삭제하는 메서드
           - 원본 배열이 바뀌는 mutation이 일어나므로, 먼저 원본을 복사한 후 사용해야 함
           - 배열 복사 시 스프레드 연산자(...)를 사용한 '[...배열명]' 방식으로 복사해야 함
             - 배열은 그냥 복사 시 주소값만 연결되기 때문
      2. 삭제한 element를 배열에서 drop한 위치에 생성하기
         - 'destination.index'와 'draggableId'를 참조해 생성
         - 배열.splice(시작인덱스, 삭제할갯수, 아이템) : 삭제할 갯수를 0으로 하고 아이템 매개변수를 넣어주면, 배열의 해당 인덱스에 아이템을 추가할 수 있음
         - 'destination'이 없을 수도 있음 (같은 자리에 drag&drop을 할 수도 있기 때문)
  - 문제 발생 : drag&drop 시 가끔 content가 떨리는 현상 (최적화 문제)
    - 이유 : 부모 component의 state가 변하면, 자식 component들까지 전부 re-rendering되기 때문 (React의 기본 동작 방식)
      - drag하는 component 이외에도, 형제 component 등 전부가 re-rendering 됨
      - console.log()로 확인 가능
    - 해결 : 'React.memo()'를 사용해 해결
      - 해당 component의 prop이 변하지 않았다면, re-rendering하지 않도록 함
      - 'export default React.memo(컴포넌트명);'을 사용
  - 다수의 보드(&lt;Droppable&gt;) 사용하기
    - 준비 과정
      1. 다수의 보드를 사용하기 위해, atomState를 여러 개의 Array를 가지는 Object로 사용하기
      2. '.map()'을 사용해 여러 개의 보드를 rendering하기
         - 'Object.keys(객체명)'으로 해당 객체의 key명들을 배열로 뽑아낼 수 있음
           - 'Object.keys(객체명).map(키명 => 객체명[키명])'을 사용해 각 key의 값들을 뽑아낼 수 있음
         - 사용자가 여러 개의 보드를 생성/삭제 할 수 있으니, interface를 설정해줘야 함
           - ex. interface IToDoState { [key: string]: string[]; }
    - drag&drop을 사용하려면, 현재 위치의 Array에서 제거한 후 새로운 위치의 Array에 붙여놓기
      - 'source'와 'destination'을 참조 가능
      1. source의 보드와 destination의 보드가 같은지 체크하기
         - 각각 '.droppableId'를 통해 참조 가능
      2. 같은 보드에서 이동이 일어날 시
         1. 수정이 일어난 보드만 복사하기
         2. 복사한 보드를 수정한 후, 다른 보드들 옆에 놓기
      3. 다른 보드로 이동이 일어날 시
         1. 출발지 보드와 도착지 보드를 복사하기
         2. 복사한 보드들을 수정한 후, 다른 보드들 옆에 놓기
      - 다른 보드들 옆에 놓기 위해 스프레드연산자(...)와 computed property name을 이용해야 하며(ES6), 전체 객체가 먼저 사용되어야 함
        - ex. return { ...allBoards, [source.droppableId]: boardCopy }
  - 문제 발생 : item을 가지고 있지 않는 보드에는 해당 보드 맨 위로 이동해야지만 item을 받을 수 있는 불편함
    - CSS로 받는 부분(&lt;Droppable&gt;의 하위 element)의 영역을 부모 element에 가득 차게끔 만들기
    - 해결 방법
      1. 부모 element에 'display: flex;' CSS를 부여하기
      2. 자식 element에 'flex-grow: 1;' CSS를 부여하기
      - 자식 element의 영역이 부모 element에 가득 차게끔 만듦
  - &lt;Droppable&gt;, &lt;Draggable&gt; - snapshot
    - &lt;Droppable&gt; 또는 &lt;Draggable&gt;의 children으로 사용되는 콜백함수의 두 번째 인자로 'snapshot'을 사용할 수 있음
      - 두 번째 자리가 중요함, 이름은 아무거나 상관없음
    - 'snapshot'의 프로퍼티는 형식 정의 파일에서 확인 가능
      - isDraggingOver : 보드로 들어올 때의 dragging에 대한 boolean값을 받음
        - 사용자가 보드 위로 drag해서 들어오고 있는지 알려줌
      - draggingFormThisWith : 사용자가 해당 보드로부터 drag를 시작했는지도 알려줌
        - 사용자가 어떤 보드를 떠난다면, 그 보드로부터 drag를 시작했다는 뜻
        - DraggableId | undefined
        - 'Boolean(draggingFormThisWith)'로 사용 시 drag하여 해당 보드를 떠나면 true
    - 사용법 : &lt;Droppable&gt;의 콜백함수 JSX element에서 프로퍼티를 부여하여 사용
      - element는 snapshot의 프로퍼티를 모르기 때문에, 형식 정의를 해주어야 함
      - 프로퍼티를 이용해 styled-components로 CSS 적용 가능
- **23-09-08 : #7.12 ~ #7.16 / React-Beautiful-Dnd(3) + Code Challenge(1)**
  - React - ref 속성
    - React.js component를 통해 HTML element를 가져와서 그걸 변형시킬 수 있도록 해줌
      - aka. vanilla JS의 document.getElementById()
    - 기본형
      const 변수명 = useRef<제네릭>(null);
      &lt;태그명 ref={변수명} /&gt;
      - 보통 'useRef()'의 인자로 null값을 사용함 (참조할 element를 초기화한 후 사용하기 위함)
  - To-Do의 타입 교체
    - 'string[]'에서 '{ id:number, text: string }[]'인 타입으로 교체
    - 문제 발생 : 'onDragEnd'에서 'draggableId'를 참조해 재배열 한 것을 바꾸어줘야 함
      - 기존의 string[] 타입에서는 draggableId = item 이어서 쉬웠음
      - 지금의 draggableId는 string타입의 id 프로퍼티 값임
    - 해결 방법 : '.index' 프로퍼티를 이용해서 item을 찾기
      - 'source.index'를 통해 타겟(Object)을 찾은 후 사용
- **23-09-09 ~ 10 : Code Challenge(2 ~ 3)**
  - Update
    - Local Storage 기능 추가
    - 쓰레기통 생성 / to-do 삭제 기능 추가
    - to-do 보드를 추가하는 모달박스(밑바탕) 구현
- **23-09-12 : Code Challenge(4)**
  - Styling : windows98 스타일
- **23-09-15 : Code Challenge(5)**
  - Fix
    - to-do 보드가 여러 개 일때, 맨위/맨아래 부분이 잘리는 현상 수정
      - Flex-Container에 'min-height'와 'padding' 할당
  - Update
    - 보드 삭제 기능 추가
      - spread 문법을 사용한 후, 'useSetRecoilState()'의 set함수 사용
    - 보드 추가 시 중복값, 빈값 예외 처리
      - 문제 : 중복값 시 데이터가 덮어씌워짐
      - 해결 : 'React-Hook-Form'의 errors 이용

---

<!-- TODO : 꾸미기(window98 스타일) / 보드 생성 버튼 색깔 넣기 -->

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.
