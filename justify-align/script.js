// دالة لتغيير تسمية حقل الإدخال إذا تم اختيار صورة
        function handleTagChange() {
            const tag = document.getElementById('tagCtrl').value;
            const contentLabel = document.getElementById('contentLabel');
            const contentCtrl = document.getElementById('contentCtrl');

            if (tag === 'img') {
                contentLabel.innerText = "رابط الصورة (URL):";
                contentCtrl.value = "data:image/jpeg;base64,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";
            } else {
                contentLabel.innerText = "المحتوى الداخلي:";
                if (contentCtrl.value.includes('http') || contentCtrl.value === "") {
                    contentCtrl.value = "عنصر";
                }
            }
            generateAll();
        }

        // الدالة الرئيسية لتوليد العرض والأكواد
        function generateAll() {
            // جلب القيم من لوحة التحكم
            const justify = document.getElementById('justifyCtrl').value;
            const align = document.getElementById('alignCtrl').value;
            const tag = document.getElementById('tagCtrl').value;
            const content = document.getElementById('contentCtrl').value;
            const count = parseInt(document.getElementById('countCtrl').value) || 1;

            const container = document.getElementById('flexContainer');
            
            // 1. تحديث شكل المعاينة
            container.style.justifyContent = justify;
            container.style.alignItems = align;
            
            // تفريغ الحاوية وإعادة بناء العناصر
            container.innerHTML = '';
            for (let i = 1; i <= count; i++) {
                let el = document.createElement(tag);
                el.className = 'preview-item';
                
                if (tag === 'img') {
                    el.src = content;
                    el.alt = `صورة رقم ${i}`;
                } else if (tag === 'a') {
                    el.href = "#";
                    el.innerText = `${content} ${i}`;
                } else {
                    el.innerText = `${content} ${i}`;
                }
                
                container.appendChild(el);
            }

            // 2. تحديث كود HTML
            let htmlString = `<الأب> (Main Element) \n`;
            for (let i = 1; i <= count; i++) {
                if (tag === 'img') {
                    htmlString += `  <img src="${content}" alt="صورة ${i}">\n`;
                } else if (tag === 'a') {
                    htmlString += `  <a href="#">${content} ${i}</a>\n`;
                } else {
                    htmlString += `  <${tag}>${content} ${i}</${tag}>\n`;
                }
            }
            htmlString += `</الأب>`;
            document.getElementById('htmlOutput').innerText = htmlString;

            // 3. تحديث كود CSS
            let cssString = `الأب (Main Element) {\n`;
            cssString += `  display: flex;\n`;
            cssString += `  justify-content: ${justify};\n`;
            cssString += `  align-items: ${align};\n`;
            cssString += `  background-color: #f8f9fa;\n`;
            cssString += `}\n\n`;

            cssString += `الأبن (Sub Element) {\n`;
            if (tag === 'img') {
                cssString += `  width: 100px;\n`;
                cssString += `  height: auto;\n`;
            } else {
                cssString += `  background-color: ${tag === 'a' ? '#27ae60' : '#2c3e50'};\n`;
                cssString += `  color: white;\n`;
                if (tag === 'a') cssString += `  text-decoration: none;\n`;
            }
            cssString += `}`;
            
            document.getElementById('cssOutput').innerText = cssString;
        }

        // دالة نسخ الكود مع إظهار رسالة
        function copyToClipboard(elementId) {
            const textToCopy = document.getElementById(elementId).innerText;
            
            // استخدام طريقة متوافقة لنسخ النص
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            
            try {
                document.execCommand('copy');
                showToast();
            } catch (err) {
                console.error('فشل النسخ', err);
            }
            
            document.body.removeChild(tempTextArea);
        }

        // دالة إظهار الإشعار المنبثق
        function showToast() {
            const toast = document.getElementById('toastMessage');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500); // يختفي بعد ثانيتين ونصف
        }

        // تشغيل الدالة مرة واحدة عند تحميل الصفحة لتهيئة الشكل الأولي
        window.onload = generateAll;