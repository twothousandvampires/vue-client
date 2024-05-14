// свичер инпута файла в инпут текста (для форм редактирования сущностей у которых есть файлы: ЖК, квартира итд)
$(".file-switcher").each(function () {
	let scope = this, name = $(this).attr('name').replace(/\[\]/, '');
	$(this).before("<br>").before(
		$(`<input type="checkbox">`).on("change", function(){
			let b = $(this).prop("checked");
			$(scope).prop('disabled', b)[b?'hide':'show']();
			$(`input[name=${name}]`).prop('disabled', !b)[b?'show':'hide']();
		}).attr('id', "switcher-"+ name).get(0)
	).before(`<label for="${"switcher-"+ name}">&nbsp;Ввести ссылку</label>`)
	 .before(`<input name="${name}" class="form-control" style="display:none" disabled>`);
});