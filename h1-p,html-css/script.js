        const liveScreen = document.getElementById('live-screen');
        const elementsManager = document.getElementById('elements-manager');
        const htmlCodeDisplay = document.getElementById('html-code');
        const cssCodeDisplay = document.getElementById('css-code');
        
        const textColorInput = document.getElementById('text-color');
        const bgColorInput = document.getElementById('bg-color');
        const alignBtns = document.querySelectorAll('.align-buttons .btn');

        let elementCounter = 0;

        // دالة لتحديث الأكواد المعروضة في الأسفل
        function updateCodes() {
            // تحديث كود CSS
            const currentAlign = liveScreen.style.textAlign || 'right';
            const currentColor = liveScreen.style.color || '#333333';
            const currentBg = liveScreen.style.backgroundColor || '#ffffff';

            const cssString = `.custom-container {
    text-align: ${currentAlign};
    color: ${currentColor};
    background-color: ${currentBg};
}`;
            cssCodeDisplay.textContent = cssString;

            // تحديث كود HTML بناء على العناصر الموجودة
            let htmlContent = '';
            const allElements = liveScreen.children;
            
            if (allElements.length === 0) {
                htmlContent = '';
            } else {
                for (let el of allElements) {
                    const tagName = el.tagName.toLowerCase();
                    const textContent = el.textContent;
                    htmlContent += `    <${tagName}>${textContent}</${tagName}>\n`;
                }
            }

            const htmlString = `<div class="custom-container">\n${htmlContent}</div>`;
            htmlCodeDisplay.textContent = htmlString;
        }

        // دالة إضافة عنصر جديد
        function addNewElement(tagName) {
            elementCounter++;
            const uniqueId = 'el-' + elementCounter;
            const defaultText = 'نص جديد (' + tagName.toUpperCase() + ')';

            // إضافة العنصر إلى شاشة المعاينة
            const newElement = document.createElement(tagName);
            newElement.id = uniqueId;
            newElement.textContent = defaultText;
            liveScreen.appendChild(newElement);

            // إضافة صف التحكم في لوحة التعديل
            const editRow = document.createElement('div');
            editRow.className = 'edit-row';
            editRow.id = 'edit-' + uniqueId;

            const tagBadge = document.createElement('span');
            tagBadge.className = 'tag-badge';
            tagBadge.textContent = tagName;

            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.className = 'edit-input';
            textInput.value = defaultText;
            
            // تحديث النص مباشرة عند الكتابة
            textInput.addEventListener('input', function() {
                newElement.textContent = this.value;
                updateCodes();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.textContent = 'حذف';
            deleteBtn.onclick = function() {
                liveScreen.removeChild(newElement);
                elementsManager.removeChild(editRow);
                updateCodes();
            };

            editRow.appendChild(tagBadge);
            editRow.appendChild(textInput);
            editRow.appendChild(deleteBtn);
            
            elementsManager.appendChild(editRow);

            updateCodes();
        }

        // أوامر التنسيقات العامة
        textColorInput.addEventListener('input', function() {
            liveScreen.style.color = this.value;
            updateCodes();
        });

        bgColorInput.addEventListener('input', function() {
            liveScreen.style.backgroundColor = this.value;
            updateCodes();
        });

        function setAlignment(position, clickedButton) {
            liveScreen.style.textAlign = position;
            
            alignBtns.forEach(btn => btn.classList.remove('active-align'));
            clickedButton.classList.add('active-align');
            
            updateCodes();
        }

        // دالة نسخ الكود الموحدة
        function copyCode(elementId, buttonElement) {
            const codeText = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = buttonElement.textContent;
                buttonElement.textContent = 'تم النسخ!';
                buttonElement.classList.add('success');
                
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.classList.remove('success');
                }, 2000);
            });
        }

        // تهيئة الصفحة بإضافة عنصرين كبداية
        addNewElement('h1');
        addNewElement('p');
        